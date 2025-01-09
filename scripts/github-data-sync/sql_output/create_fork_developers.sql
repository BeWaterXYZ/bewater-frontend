-- 创建表存储 fork 项目的开发者信息
DROP TABLE IF EXISTS fork_project_developers;
CREATE TABLE fork_project_developers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    developer_id INT,
    login VARCHAR(255),
    name VARCHAR(255),
    followers INT,
    following INT,
    public_repos INT,
    total_stars INT,
    only_fork_projects BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入数据：所有来自 fork 项目的开发者（检查前5个贡献者）
INSERT INTO fork_project_developers (developer_id, login, name, followers, following, public_repos, total_stars, only_fork_projects)
SELECT DISTINCT
    d.id as developer_id,
    d.login,
    d.name,
    d.followers,
    d.following,
    d.public_repos,
    d.total_stars,
    NOT EXISTS (
        SELECT 1 
        FROM operationProject p2
        WHERE p2.is_fork = false 
        AND (
            JSON_UNQUOTE(JSON_EXTRACT(p2.contributors, '$[0].login')) = d.login OR
            JSON_UNQUOTE(JSON_EXTRACT(p2.contributors, '$[1].login')) = d.login OR
            JSON_UNQUOTE(JSON_EXTRACT(p2.contributors, '$[2].login')) = d.login OR
            JSON_UNQUOTE(JSON_EXTRACT(p2.contributors, '$[3].login')) = d.login OR
            JSON_UNQUOTE(JSON_EXTRACT(p2.contributors, '$[4].login')) = d.login
        )
    ) as only_fork_projects
FROM operationProject p
JOIN operationDeveloper d ON (
    d.login IN (
        JSON_UNQUOTE(JSON_EXTRACT(p.contributors, '$[0].login')),
        JSON_UNQUOTE(JSON_EXTRACT(p.contributors, '$[1].login')),
        JSON_UNQUOTE(JSON_EXTRACT(p.contributors, '$[2].login')),
        JSON_UNQUOTE(JSON_EXTRACT(p.contributors, '$[3].login')),
        JSON_UNQUOTE(JSON_EXTRACT(p.contributors, '$[4].login'))
    )
)
WHERE p.is_fork = true;

-- 查看统计信息
SELECT 
    COUNT(*) as total_developers,
    SUM(CASE WHEN only_fork_projects = true THEN 1 ELSE 0 END) as only_fork_developers
FROM fork_project_developers;

-- 查看仅参与 fork 项目的开发者详细信息
SELECT 
    developer_id,
    login,
    name,
    followers,
    following,
    public_repos,
    total_stars
FROM fork_project_developers
WHERE only_fork_projects = true
ORDER BY followers DESC; 