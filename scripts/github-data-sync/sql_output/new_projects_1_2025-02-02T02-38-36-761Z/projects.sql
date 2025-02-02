
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
      'https://github.com/NonceGeek/scaffold-move',
      'NonceGeek/scaffold-move',
      'scaffold-move',
      'dApp scaffold for Move Chains -- Movement, Aptos, Rooch ...',
      '[{"name":"TypeScript","percentage":87},{"name":"Move","percentage":11},{"name":"JavaScript","percentage":1}]',
      29,
      27,
      '["aptos","movement","rooch","scaffold"]',
      '[{"login":"leeduckgo","avatar_url":"https://avatars.githubusercontent.com/u/12784118?v=4"},{"login":"0xfynnix","avatar_url":"https://avatars.githubusercontent.com/u/24215571?v=4"},{"login":"qiwihui","avatar_url":"https://avatars.githubusercontent.com/u/3297411?v=4"},{"login":"v1xingyue","avatar_url":"https://avatars.githubusercontent.com/u/974169?v=4"},{"login":"Dream4ever","avatar_url":"https://avatars.githubusercontent.com/u/2596367?v=4"}]',
      '2025-01-27T22:10:17Z',
      '2022-11-04T14:01:35Z',
      '["Move.Movement"]',
      '[]',
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
