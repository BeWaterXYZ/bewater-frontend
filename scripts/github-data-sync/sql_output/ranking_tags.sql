
INSERT INTO rankingTags (
  name,
  type,
  description,
  createdAt,
  updatedAt
) VALUES 
(
      'EVM',
      'ECOSYSTEM',
      NULL,
      NOW(),
      NOW()
    ),
(
      'COSMOS',
      'ECOSYSTEM',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Other',
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
