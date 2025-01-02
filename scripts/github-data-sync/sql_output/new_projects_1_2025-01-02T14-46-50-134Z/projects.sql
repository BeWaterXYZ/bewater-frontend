
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
(
      'https://github.com/join-the-flock/flock',
      'join-the-flock/flock',
      'flock',
      'A community fork of Flutter',
      '[{"name":"Dart","percentage":76},{"name":"C++","percentage":16},{"name":"Java","percentage":3}]',
      100,
      7,
      '[]',
      '[{"login":"skia-flutter-autoroll","avatar_url":"https://avatars.githubusercontent.com/u/37626415?v=4"},{"login":"engine-flutter-autoroll","avatar_url":"https://avatars.githubusercontent.com/u/42042535?v=4"},{"login":"abarth","avatar_url":"https://avatars.githubusercontent.com/u/112007?v=4"},{"login":"jonahwilliams","avatar_url":"https://avatars.githubusercontent.com/u/8975114?v=4"},{"login":"Hixie","avatar_url":"https://avatars.githubusercontent.com/u/551196?v=4"}]',
      '2025-01-02T12:43:35Z',
      '2024-11-22T22:16:00Z',
      '[]',
      '["AI"]',
      NOW(),
      NOW()
    )
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
