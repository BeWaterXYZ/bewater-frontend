import * as fs from 'fs';
import * as path from 'path';

interface Contributor {
  login: string;
  avatar_url: string;
}

// CSV 列索引定义
const COLUMN_INDICES = {
  ID: 0,
  REPO_URL: 1,
  REPO_NAME: 2,
  NAME: 3,
  DESCRIPTION: 4,
  LANGUAGES: 5,
  STARGAZERS_COUNT: 6,
  FORKS_COUNT: 7,
  TOPICS: 8,
  CONTRIBUTORS: 9,
  UPDATED_AT: 10,
  CREATED_AT: 11,
  ECOSYSTEMS: 12,
  SECTORS: 13,
  CREATED_AT_2: 14,
  UPDATED_AT_2: 15,
  TRACKS: 16
};

function generateSectorTagsSql(sectorTags: Set<string>): string {
  const values = Array.from(sectorTags).map(tag => {
    return `(
      '${tag.replace(/'/g, "''")}',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    )`;
  });

  if (values.length === 0) {
    return `-- No sector tags to insert`;
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

function generateProjectSectorsSql(projectSectors: Map<string, string[]>): string {
  const cases = Array.from(projectSectors.entries())
    .map(([repoUrl, sectors]) => {
      const sectorValues = sectors.map(s => `"${s}"`).join(', ');
      return `        WHEN repoUrl = '${repoUrl}' THEN JSON_ARRAY(${sectorValues})`;
    })
    .join('\n');

  const repoUrls = Array.from(projectSectors.keys())
    .map(url => `'${url}'`)
    .join(',');

  return `
UPDATE operationProject 
SET sectors = CASE
${cases}
    END,
    updatedAt = NOW()
WHERE repoUrl IN (${repoUrls});`;
}

function generateDeveloperSectorsSql(developerSectors: Map<string, string[]>): string {
  const cases = Array.from(developerSectors.entries())
    .map(([login, sectors]) => {
      const sectorValues = sectors.map(s => `"${s}"`).join(', ');
      return `        WHEN login = '${login}' THEN JSON_ARRAY(${sectorValues})`;
    })
    .join('\n');

  const logins = Array.from(developerSectors.keys())
    .map(login => `'${login}'`)
    .join(',');

  return `
UPDATE operationDeveloper 
SET sectors = CASE
${cases}
    END,
    updatedAt = NOW()
WHERE login IN (${logins});`;
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let currentValue = '';
  let insideQuotes = false;
  let doubleQuoteCount = 0;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      doubleQuoteCount++;
      if (doubleQuoteCount === 2) {
        // 两个连续的双引号表示转义的双引号
        currentValue += '"';
        doubleQuoteCount = 0;
      } else if (doubleQuoteCount === 1) {
        // 第一个双引号，切换引号状态
        insideQuotes = !insideQuotes;
      }
    } else {
      if (doubleQuoteCount === 1) {
        // 重置双引号计数
        doubleQuoteCount = 0;
      }
      
      if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
  }
  
  values.push(currentValue.trim());
  return values.map(v => v.replace(/^"|"$/g, '').trim());
}

function parseContributors(contributorsStr: string): Contributor[] {
  try {
    // 处理转义的双引号
    const unescapedStr = contributorsStr
      .replace(/\\"/g, '"')  // 替换 \" 为 "
      .replace(/"{2}/g, '"') // 替换 "" 为 "
      .replace(/^"|"$/g, ''); // 移除首尾的引号

    // 尝试解析 JSON
    return JSON.parse(unescapedStr);
  } catch (e) {
    console.error('Error parsing contributors:', e);
    console.error('Original string:', contributorsStr);
    return [];
  }
}

async function main() {
  console.log('Starting sectors SQL generation...\n');
  
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

  // Read the CSV file content
  const fileContent = fs.readFileSync(path.resolve(csvFile), 'utf-8');
  const lines = fileContent.split('\n');
  
  console.log('CSV file content preview:');
  console.log(lines.slice(0, 3).join('\n'));

  const sectorTags = new Set<string>();
  const projectSectors = new Map<string, string[]>();
  const developerSectors = new Map<string, string[]>();

  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV line properly handling quoted values
    const values = parseCSVLine(line);
    
    // Get tracks (sectors)
    const tracks = values[COLUMN_INDICES.TRACKS];
    if (!tracks || tracks === '') continue;

    // Split tracks by comma and handle multiple sectors
    const sectors = tracks.split(',').map(s => s.trim());
    
    // Add to sector tags
    sectors.forEach(sector => {
      if (sector && sector !== '') {
        sectorTags.add(sector);
      }
    });

    // Add to project sectors
    const repoUrl = values[COLUMN_INDICES.REPO_URL];
    if (repoUrl) {
      projectSectors.set(repoUrl, sectors);
    }

    // Add to developer sectors
    const contributorsJson = values[COLUMN_INDICES.CONTRIBUTORS];
    if (contributorsJson) {
      const contributors = parseContributors(contributorsJson);
      contributors.forEach(contributor => {
        if (contributor.login) {
          const existingSectors = developerSectors.get(contributor.login) || [];
          const newSectors = Array.from(new Set([...existingSectors, ...sectors]));
          developerSectors.set(contributor.login, newSectors);
        }
      });
    }
  }

  // Generate SQL files
  const sectorTagsSql = generateSectorTagsSql(sectorTags);
  fs.writeFileSync(path.join(sqlOutputDir, 'sector_tags.sql'), sectorTagsSql);

  const projectSectorsSql = generateProjectSectorsSql(projectSectors);
  fs.writeFileSync(path.join(sqlOutputDir, 'project_sectors.sql'), projectSectorsSql);

  const developerSectorsSql = generateDeveloperSectorsSql(developerSectors);
  fs.writeFileSync(path.join(sqlOutputDir, 'developer_sectors.sql'), developerSectorsSql);
  
  // Print summary
  if (sectorTags.size > 0) {
    console.log(`\nFound ${sectorTags.size} sector tags:`);
    console.log(Array.from(sectorTags).join(', '));
    console.log(`\nUpdating ${projectSectors.size} projects`);
    console.log(`Updating ${developerSectors.size} developers`);
  } else {
    console.log('\nNo sector tags found in the CSV file');
  }
  
  console.log('\nSQL files have been saved to:', sqlOutputDir);
  console.log('- sector_tags.sql (RankingTags updates)');
  console.log('- project_sectors.sql (OperationProject updates)');
  console.log('- developer_sectors.sql (OperationDeveloper updates)');
  console.log('\nGeneration completed!');
}

main().catch(console.error); 