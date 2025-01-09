-- 更新 operationDeveloper 表中仅参与 fork 项目的开发者状态
UPDATE operationDeveloper d
INNER JOIN fork_project_developers f ON d.id = f.developer_id
SET 
    d.is_deleted = true,
    d.delete_reason = '开发者仅参与 fork 项目',
    d.updatedAt = NOW()
WHERE f.only_fork_projects = true;

-- 查看更新结果
SELECT 
    id,
    login,
    name,
    is_deleted,
    delete_reason,
    updatedAt
FROM operationDeveloper
WHERE is_deleted = true
    AND delete_reason = '开发者仅参与 fork 项目'
ORDER BY id; 