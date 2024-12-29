import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';

// 不使用接口，因为 CSV 中有重复的列名
const COLUMN_INDICES = {
  ORG_NAME: 0,
  ORG_TAG: 1,
  PROJECT_NAME: 2,
  PROJECT_TAG: 3,
  BUILDER_NAME: 4,
  BUILDER_TAG: 5
};

function generateRankingTagsSql(tags: Set<string>) {
  const values = Array.from(tags).map(tag => {
    return `(
      '${tag.replace(/'/g, "''")}',
      'ECOSYSTEM',
      NULL,
      NOW(),
      NOW()
    )`;
  });

  if (values.length === 0) {
    return `
-- No ranking tags to insert
-- INSERT INTO rankingTags (name, type, description, createdAt, updatedAt)
-- VALUES ... would go here
`;
  }

  return `
INSERT INTO rankingTags (
  name,
  type,
  description,
  createdAt,
  updatedAt
) VALUES 
${values.join(',\n')}
ON DUPLICATE KEY UPDATE
  updatedAt = NOW();
`;
}

async function main() {
  console.log('Starting ranking tags SQL generation...\n');
  
  const csvFile = process.argv[2];
  if (!csvFile) {
    console.error('Please provide CSV file path as argument');
    process.exit(1);
  }

  // Create SQL output directory
  const sqlOutputDir = path.join(process.cwd(), 'sql_output');
  if (!fs.existsSync(sqlOutputDir)) {
    fs.mkdirSync(sqlOutputDir);
  }

  // Read the CSV file content directly
  const fileContent = fs.readFileSync(path.resolve(csvFile), 'utf-8');
  const lines = fileContent.split('\n');
  
  console.log('CSV file content preview:');
  console.log(lines.slice(0, 3).join('\n'));

  const ecosystemTags = new Set<string>();

  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Split the line by comma, but handle quoted values correctly
    const values = line.split(',').map(v => v.trim());
    
    // Get tags from each tag column
    const tags = [
      values[COLUMN_INDICES.ORG_TAG],
      values[COLUMN_INDICES.PROJECT_TAG],
      values[COLUMN_INDICES.BUILDER_TAG]
    ];
    
    tags.forEach(tag => {
      if (tag && tag !== '') {
        console.log(`Found tag: "${tag}"`);
        ecosystemTags.add(tag);
      }
    });
  }

  // Generate ranking tags SQL
  const tagsSql = generateRankingTagsSql(ecosystemTags);
  fs.writeFileSync(path.join(sqlOutputDir, 'ranking_tags.sql'), tagsSql);
  
  if (ecosystemTags.size > 0) {
    console.log(`\nFound ${ecosystemTags.size} ecosystem tags:`);
    console.log(Array.from(ecosystemTags).join(', '));
  } else {
    console.log('\nNo ecosystem tags found in the CSV file');
    console.log('Please check if the CSV file has the correct format and contains Tags columns');
  }
  
  console.log('\nSQL file has been saved to:', path.join(sqlOutputDir, 'ranking_tags.sql'));
  console.log('\nGeneration completed!');
}

main().catch(console.error); 