const fs = require('fs');
const path = require('path');

// Read the original SQL file
const sqlFile = path.join(__dirname, 'sql_output', 'developers.sql');
let sql = fs.readFileSync(sqlFile, 'utf8');

// Function to properly escape SQL strings
function escapeSqlString(str) {
    if (str === null || str === undefined || str === 'NULL') return 'NULL';
    if (str === 'NOW()') return str;
    
    // Handle JSON strings specially
    if (str.startsWith('{') || str.startsWith('[')) {
        try {
            // Try to parse and re-stringify to ensure valid JSON
            const jsonObj = JSON.parse(str);
            return `'${JSON.stringify(jsonObj).replace(/'/g, "''")}'`;
        } catch (e) {
            console.error('Invalid JSON:', str);
            return 'NULL';
        }
    }
    
    // Convert to string and handle special characters
    str = String(str)
        .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, char => {
            switch (char) {
                case "'": return "''";
                case "\0": return "\\0";
                case "\x08": return "\\b";
                case "\x09": return "\\t";
                case "\x1a": return "\\z";
                case "\n": return "\\n";
                case "\r": return "\\r";
                case "\"": return '\\"';
                case "\\": return "\\\\";
                case "%": return "\\%";
                default: return char;
            }
        })
        // Additional safety replacements
        .replace(/\?/g, "\\?")
        .replace(/`/g, "\\`");
    
    return `'${str}'`;
}

// Extract the insert statement and values
const insertMatch = sql.match(/INSERT INTO.*?\(([\s\S]*?)\)\s*VALUES\s*([\s\S]*?)(ON DUPLICATE|$)/i);
if (!insertMatch) {
    console.error('Could not parse SQL format');
    process.exit(1);
}

const [_, columns, valuesSection] = insertMatch;
const columnNames = columns.split(',').map(col => col.trim());
const expectedColumnCount = columnNames.length;
console.log('Expected column count:', expectedColumnCount);
console.log('Columns:', columnNames);

// Function to fix JSON fields
function fixJsonField(field, recordIndex) {
    try {
        // Remove quotes and escape sequences
        const unquoted = field.replace(/^'|'$/g, '').replace(/\\"/g, '"');
        
        // Log the JSON for debugging
        console.log(`\nDebug - Record ${recordIndex}, JSON field:`);
        console.log('Original:', field);
        console.log('Unquoted:', unquoted);
        
        // Try to parse as JSON
        let jsonObj;
        try {
            jsonObj = JSON.parse(unquoted);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError.message);
            console.error('Problematic JSON:', unquoted);
            
            // Try to fix common JSON issues
            let fixedJson = unquoted
                .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3') // Add quotes around unquoted keys
                .replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
                .replace(/\\/g, '\\\\') // Properly escape backslashes
                .replace(/([^\\])"/g, '$1\\"'); // Escape unescaped quotes
                
            console.log('Attempting to fix JSON:', fixedJson);
            jsonObj = JSON.parse(fixedJson);
        }
        
        // Re-stringify with proper escaping
        const fixedJson = JSON.stringify(jsonObj).replace(/'/g, "''");
        console.log('Fixed JSON:', fixedJson);
        
        return `'${fixedJson}'`;
    } catch (e) {
        console.error('Failed to fix JSON:', e.message);
        return 'NULL';
    }
}

// Process values
const values = valuesSection
    .trim()
    .replace(/^\s*\(\s*/, '')  // Remove first opening parenthesis
    .replace(/\s*\)[,;]?\s*$/, '')  // Remove last closing parenthesis and any trailing comma/semicolon
    .split(/\)\s*,\s*\(/g)  // Split into individual records
    .map((record, recordIndex) => {
        try {
            // Split record into fields
            const fields = record.split(/,\s*(?=(?:[^']*'[^']*')*[^']*$)/);
            
            // Check if field count matches column count
            if (fields.length !== expectedColumnCount) {
                console.error(`\nError in record ${recordIndex + 1}:`);
                console.error(`Expected ${expectedColumnCount} columns but got ${fields.length} fields`);
                console.error('Record:', record);
                
                // Try to fix JSON fields that might have been split incorrectly
                const fixedFields = [];
                let currentField = '';
                let inJson = false;
                
                for (const field of fields) {
                    if (!inJson && (field.includes('{"') || field.includes('["'))) {
                        inJson = true;
                        currentField = field;
                    } else if (inJson) {
                        currentField += ',' + field;
                        if (field.includes('}') || field.includes(']')) {
                            inJson = false;
                            fixedFields.push(fixJsonField(currentField, recordIndex));
                            currentField = '';
                        }
                    } else {
                        fixedFields.push(field);
                    }
                }
                
                // Pad or truncate fields to match expected count
                if (fixedFields.length < expectedColumnCount) {
                    console.log(`Padding record ${recordIndex + 1} with NULL values`);
                    while (fixedFields.length < expectedColumnCount) {
                        fixedFields.push('NULL');
                    }
                } else if (fixedFields.length > expectedColumnCount) {
                    console.log(`Truncating record ${recordIndex + 1} to ${expectedColumnCount} fields`);
                    fixedFields.length = expectedColumnCount;
                }
                
                return fixedFields.map((field, fieldIndex) => {
                    field = field.trim();
                    if (field === 'NULL' || field === 'NOW()') return field;
                    return escapeSqlString(field.replace(/^'|'$/g, ''));
                }).join(',\n      ');
            }

            return fields.map((field, fieldIndex) => {
                field = field.trim();
                try {
                    if (field === 'NULL' || field === 'NOW()') return field;
                    
                    // Special handling for popular_repo column
                    if (columnNames[fieldIndex] === 'popular_repo') {
                        return fixJsonField(field, recordIndex + 1);
                    }
                    
                    // Special handling for array fields
                    if (field.startsWith('[') && field.endsWith(']')) {
                        return fixJsonField(field, recordIndex + 1);
                    }
                    
                    // Remove existing quotes and re-escape
                    const unquoted = field.replace(/^'|'$/g, '');
                    const escaped = escapeSqlString(unquoted);
                    
                    // Debug output for problematic fields
                    if (escaped.includes('?') || escaped.includes('\\?')) {
                        console.log(`\nDebug - Record ${recordIndex + 1}, Field ${fieldIndex + 1} (${columnNames[fieldIndex]}):`);
                        console.log('Original:', field);
                        console.log('Unquoted:', unquoted);
                        console.log('Escaped:', escaped);
                    }
                    
                    return escaped;
                } catch (fieldError) {
                    console.error(`\nError processing field ${fieldIndex + 1} in record ${recordIndex + 1}:`, field);
                    console.error('Column:', columnNames[fieldIndex]);
                    if (columnNames[fieldIndex] === 'popular_repo') {
                        return 'NULL';
                    }
                    throw fieldError;
                }
            }).join(',\n      ');
        } catch (recordError) {
            console.error(`\nError processing record ${recordIndex + 1}:`, record);
            throw recordError;
        }
    })
    .join('),\n(');

// Reconstruct the SQL with the ON DUPLICATE KEY UPDATE section
const onDuplicateSection = `
ON DUPLICATE KEY UPDATE
  avatar_url = VALUES(avatar_url),
  name = VALUES(name),
  bio = VALUES(bio),
  company = VALUES(company),
  location = VALUES(location),
  email = VALUES(email),
  twitter_username = VALUES(twitter_username),
  followers = VALUES(followers),
  following = VALUES(following),
  public_repos = VALUES(public_repos),
  total_stars = VALUES(total_stars),
  popular_repo = VALUES(popular_repo),
  updated_at = VALUES(updated_at),
  ecosystems = JSON_MERGE_PRESERVE(ecosystems, VALUES(ecosystems)),
  updatedAt = NOW();`;

const fixedSql = `INSERT INTO operationDeveloper (${columns}) VALUES (\n      ${values}\n    )${onDuplicateSection}`;

// Save to a new file
const fixedSqlFile = path.join(__dirname, 'sql_output', 'developers.fixed.sql');
fs.writeFileSync(fixedSqlFile, fixedSql);

// Save a debug file with the first few records for inspection
const debugSqlFile = path.join(__dirname, 'sql_output', 'developers.debug.sql');
const debugSql = fixedSql.split('\n').slice(0, 100).join('\n');
fs.writeFileSync(debugSqlFile, debugSql);

console.log('\nFixed SQL has been saved to:', fixedSqlFile);
console.log('Debug SQL (first few records) has been saved to:', debugSqlFile); 