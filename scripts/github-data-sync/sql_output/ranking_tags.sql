
INSERT INTO rankingTags (
  name,
  type,
  description,
  createdAt,
  updatedAt
) VALUES 
(
      'Cosmos',
      'ECOSYSTEM',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Ton',
      'ECOSYSTEM',
      NULL,
      NOW(),
      NOW()
    )
ON DUPLICATE KEY UPDATE
  updatedAt = NOW();
