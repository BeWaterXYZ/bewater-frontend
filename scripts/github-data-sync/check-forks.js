import fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';


config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 控制并发数
const BATCH_SIZE = 10;

function parseRepoFullName(fullName) {
  const [owner, repo] = fullName.split('/');
  return { owner, repo };
}

async function checkForkStatus(repoFullName) {
  try {
    const { owner, repo } = parseRepoFullName(repoFullName);
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.fork;
  } catch (error) {
    console.error(`Error checking fork status for ${repoFullName}:`, error.message);
    return null;
  }
}

// 处理一批仓库
async function processBatch(repos, totalRepos, processedCount) {
  const promises = repos.map(async (repo) => {
    const isFork = await checkForkStatus(repo.repoName);
    const currentCount = processedCount + 1;
    
    if (isFork) {
      console.log(`[${currentCount}/${totalRepos}] ${repo.repoName} 是 fork 的仓库`);
      return { id: repo.id, isFork: true };
    } else if (isFork === false) {
      console.log(`[${currentCount}/${totalRepos}] ${repo.repoName} 不是 fork 的仓库`);
      return { id: repo.id, isFork: false };
    } else {
      console.log(`[${currentCount}/${totalRepos}] ${repo.repoName} 检查失败，跳过`);
      return { id: repo.id, isFork: null };
    }
  });

  return Promise.all(promises);
}

async function main() {
  console.log('开始检查仓库 fork 状态...');
  
  const forkedRepos = [];
  const csvFilePath = path.join(__dirname, 'source/all_repos.csv');
  const sqlQueryPath = path.join(__dirname, 'sql_output/query_forks.sql');
  const sqlUpdatePath = path.join(__dirname, 'sql_output/update_forks.sql');

  // 读取所有仓库到内存
  const allRepos = [];
  const parser = fs
    .createReadStream(csvFilePath)
    .pipe(parse({ columns: true, skip_empty_lines: true }));

  for await (const record of parser) {
    allRepos.push(record);
  }

  const totalRepos = allRepos.length;
  console.log(`总共发现 ${totalRepos} 个仓库需要检查`);
  console.log(`将使用 ${BATCH_SIZE} 个并发请求进行检查\n`);

  // 分批处理
  for (let i = 0; i < allRepos.length; i += BATCH_SIZE) {
    const batch = allRepos.slice(i, i + BATCH_SIZE);
    const results = await processBatch(batch, totalRepos, i);
    
    // 收集 fork 的仓库
    results.forEach(result => {
      if (result.isFork) {
        forkedRepos.push(result.id);
      }
    });

    // 每批处理完后等待一秒，避免触发限制
    if (i + BATCH_SIZE < allRepos.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n检查完成，正在生成 SQL 文件...');

  const sqlQuery = `
-- 查询所有 fork 的项目信息
SELECT 
  id,
  repoName,
  name,
  description,
  stargazers_count,
  forks_count,
  updated_at,
  created_at
FROM operationProject
WHERE id IN (${forkedRepos.join(',')})
ORDER BY id;`;

  const sqlUpdates = `
-- 更新 fork 项目的状态
UPDATE operationProject 
SET is_fork = true 
WHERE id IN (${forkedRepos.join(',')});`;

  fs.writeFileSync(sqlQueryPath, sqlQuery);
  fs.writeFileSync(sqlUpdatePath, sqlUpdates);
  
  console.log(`\n执行结果：`);
  console.log(`- 总共检查了 ${totalRepos} 个仓库`);
  console.log(`- 发现 ${forkedRepos.length} 个 fork 的仓库`);
  console.log(`- 查询 SQL 已写入: ${sqlQueryPath}`);
  console.log(`- 更新 SQL 已写入: ${sqlUpdatePath}`);
}

main().catch(console.error); 