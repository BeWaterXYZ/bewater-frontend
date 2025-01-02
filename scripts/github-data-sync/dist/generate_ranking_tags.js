import * as fs from 'fs';
import * as path from 'path';
// 不使用接口，因为 CSV 中有重复的列名
const COLUMN_INDICES = {
    ORG_NAME: 0,
    ORG_TAG: 1,
    PROJECT_NAME: 2,
    PROJECT_TAG: 3,
    BUILDER_NAME: 4,
    BUILDER_TAG: 5,
    REPO_URL: 1, // repoUrl 列索引
    CONTRIBUTORS: 9, // contributors 列索引
    TRACKS: 16 // Tracks 列索引
};
function generateRankingTagsSql(ecosystemTags, sectorTags) {
    const values = [
        // Ecosystem tags
        ...Array.from(ecosystemTags).map(tag => {
            return `(
      '${tag.replace(/'/g, "''")}',
      'ECOSYSTEM',
      NULL,
      NOW(),
      NOW()
    )`;
        }),
        // Sector tags
        ...Array.from(sectorTags).map(tag => {
            return `(
      '${tag.replace(/'/g, "''")}',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    )`;
        })
    ];
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
function generateProjectSectorsSql(projectSectors) {
    const values = Array.from(projectSectors.entries()).map(([repoUrl, sectors]) => {
        return `UPDATE operationProject 
    SET sectors = '${JSON.stringify(sectors)}',
        updatedAt = NOW()
    WHERE repoUrl = '${repoUrl.replace(/'/g, "''")}'`;
    });
    if (values.length === 0)
        return '';
    return values.join(';\n') + ';';
}
function generateDeveloperSectorsSql(developerSectors) {
    const values = Array.from(developerSectors.entries()).map(([login, sectors]) => {
        return `UPDATE operationDeveloper 
    SET sectors = '${JSON.stringify(sectors)}',
        updatedAt = NOW()
    WHERE login = '${login.replace(/'/g, "''")}'`;
    });
    if (values.length === 0)
        return '';
    return values.join(';\n') + ';';
}
async function main() {
    console.log('Starting SQL generation...\n');
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
    const ecosystemTags = new Set();
    const sectorTags = new Set();
    const projectSectors = new Map();
    const developerSectors = new Map();
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line)
            continue;
        // Split the line by comma, but handle quoted values correctly
        const values = line.split(',').map(v => v.trim());
        // Get tracks
        const tracks = values[COLUMN_INDICES.TRACKS];
        if (!tracks || tracks === '')
            continue;
        // Add to sector tags
        const sectors = tracks.split(',').map(s => s.trim());
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
        try {
            const contributorsJson = values[COLUMN_INDICES.CONTRIBUTORS];
            if (contributorsJson) {
                const contributors = JSON.parse(contributorsJson);
                contributors.forEach((contributor) => {
                    if (contributor.login) {
                        const existingSectors = developerSectors.get(contributor.login) || [];
                        const newSectors = Array.from(new Set([...existingSectors, ...sectors]));
                        developerSectors.set(contributor.login, newSectors);
                    }
                });
            }
        }
        catch (e) {
            console.error(`Error parsing contributors for line ${i + 1}:`, e);
        }
    }
    // Generate SQL files
    const tagsSql = generateRankingTagsSql(ecosystemTags, sectorTags);
    fs.writeFileSync(path.join(sqlOutputDir, 'ranking_tags.sql'), tagsSql);
    const projectSectorsSql = generateProjectSectorsSql(projectSectors);
    fs.writeFileSync(path.join(sqlOutputDir, 'project_sectors.sql'), projectSectorsSql);
    const developerSectorsSql = generateDeveloperSectorsSql(developerSectors);
    fs.writeFileSync(path.join(sqlOutputDir, 'developer_sectors.sql'), developerSectorsSql);
    if (sectorTags.size > 0) {
        console.log(`\nFound ${sectorTags.size} sector tags:`);
        console.log(Array.from(sectorTags).join(', '));
    }
    else {
        console.log('\nNo sector tags found in the CSV file');
    }
    console.log('\nSQL files have been saved to:', sqlOutputDir);
    console.log('\nGeneration completed!');
}
main().catch(console.error);
