
INSERT INTO rankingTags (
  name,
  type,
  description,
  createdAt,
  updatedAt
) VALUES 
(
      'Infra',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Tool',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Defi',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'DAO',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Doc',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'AI',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Security',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Wallet',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Gaming',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Other',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'obsoleted',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Data',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    ),
(
      'Social',
      'SECTOR',
      NULL,
      NOW(),
      NOW()
    )
ON DUPLICATE KEY UPDATE
  updatedAt = NOW();
