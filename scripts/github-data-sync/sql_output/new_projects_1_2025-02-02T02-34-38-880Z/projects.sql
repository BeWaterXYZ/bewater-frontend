
INSERT INTO operationProject (
  repoUrl,
  repoName,
  name,
  description,
  languages,
  stargazers_count,
  forks_count,
  topics,
  contributors,
  updated_at,
  created_at,
  ecosystems,
  sectors,
  createdAt,
  updatedAt
) VALUES 

ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  languages = VALUES(languages),
  stargazers_count = VALUES(stargazers_count),
  forks_count = VALUES(forks_count),
  topics = VALUES(topics),
  contributors = VALUES(contributors),
  updated_at = VALUES(updated_at),
  ecosystems = JSON_ARRAY_APPEND(
    COALESCE(ecosystems, '[]'),
    '$',
    JSON_EXTRACT(VALUES(ecosystems), '$[0]')
  ),
  sectors = JSON_ARRAY_APPEND(
    COALESCE(sectors, '[]'),
    '$',
    JSON_EXTRACT(VALUES(sectors), '$[0]')
  ),
  updatedAt = NOW();
