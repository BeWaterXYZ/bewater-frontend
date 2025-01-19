
INSERT INTO rankingTags (
  name,
  type,
  description,
  createdAt,
  updatedAt
) VALUES 
(
      'Polkadot',
      'ECOSYSTEM',
      NULL,
      NOW(),
      NOW()
    )
ON DUPLICATE KEY UPDATE
  updatedAt = NOW();
