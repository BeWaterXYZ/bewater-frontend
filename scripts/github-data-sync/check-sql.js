const fs = require('fs');

function validateSQL(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const records = content.split('),(');
    
    records.forEach((record, index) => {
        // 清理记录两端的括号
        record = record.replace(/^\s*\(\s*/, '').replace(/\s*\)\s*$/, '');
        
        // 分割字段
        const fields = record.split(',');
        
        // 找到 popular_repo 字段 (根据你的 SQL 结构，它是第14个字段)
        const popularRepoField = fields[13];  // 0-based index
        
        if (popularRepoField) {
            try {
                // 去掉字段两端的引号
                const jsonStr = popularRepoField.trim().replace(/^'|'$/g, '');
                // 尝试解析 JSON
                JSON.parse(jsonStr);
            } catch (e) {
                console.log(`\n错误在第 ${index + 1} 条记录:`);
                console.log('原始数据:', popularRepoField);
                console.log('错误信息:', e.message);
                // 打印上下文
                console.log('前后文:', fields.slice(12, 15).join(','));
            }
        }
    });
}

// 使用方法
validateSQL('./scripts/github-data-sync/sql_output/developers.sql');
