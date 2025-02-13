
INSERT INTO operationDeveloper (
  html_url,
  avatar_url,
  login,
  name,
  bio,
  company,
  location,
  email,
  twitter_username,
  followers,
  following,
  public_repos,
  total_stars,
  popular_repo,
  created_at,
  updated_at,
  ecosystems,
  sectors,
  createdAt,
  updatedAt
) VALUES 
(
      'https://github.com/leeduckgo',
      'https://avatars.githubusercontent.com/u/12784118?v=4',
      'leeduckgo',
      '李大狗',
      '正趣狗上狗（Doge）\r\n\r\nEthereum Addr: 0x73c7448760517E3E6e416b2c130E3c6dB2026A1d',
      'NonceGeekDAO Founder',
      NULL,
      'leeduckgo@gmail.com',
      '0xleeduckgo',
      261,
      131,
      297,
      0,
      NULL,
      '2015-06-07T11:59:49Z',
      '2025-01-14T08:40:56Z',
      '["Move.Movement"]',
      '[]',
      NOW(),
      NOW()
    ),
(
      'https://github.com/0xfynnix',
      'https://avatars.githubusercontent.com/u/24215571?v=4',
      '0xfynnix',
      'Fynn',
      '一朵花为什么开放呢？                  \r\nEthereum Addr:\r\n0xE6DCB3b5fCB6B5Cf8c5574da53a313b688527AcA',
      NULL,
      NULL,
      '0xfynnix@gmail.com',
      NULL,
      31,
      123,
      34,
      0,
      NULL,
      '2016-11-28T02:22:49Z',
      '2025-01-31T11:43:41Z',
      '["Move.Movement"]',
      '[]',
      NOW(),
      NOW()
    ),
(
      'https://github.com/qiwihui',
      'https://avatars.githubusercontent.com/u/3297411?v=4',
      'qiwihui',
      'qiwihui',
      'Don''t be evil or greedy.\r\nFocus on AI and security.',
      NULL,
      'Nowhere, Neverland, China',
      'qwh005007@gmail.com',
      NULL,
      329,
      209,
      172,
      0,
      NULL,
      '2013-01-17T15:33:38Z',
      '2025-01-17T02:14:12Z',
      '["Move.Movement"]',
      '[]',
      NOW(),
      NOW()
    ),
(
      'https://github.com/v1xingyue',
      'https://avatars.githubusercontent.com/u/974169?v=4',
      'v1xingyue',
      'v1xingyue',
      'Hope a beautiful web3 world !!\r\nEvm Address : 0x427fb105d12A7879F784079B2612F881318839a8 ',
      NULL,
      NULL,
      'qixingyue@gmail.com',
      'v1xingyue',
      85,
      183,
      287,
      0,
      NULL,
      '2011-08-11T15:25:00Z',
      '2025-01-24T05:26:41Z',
      '["Move.Movement"]',
      '[]',
      NOW(),
      NOW()
    ),
(
      'https://github.com/Dream4ever',
      'https://avatars.githubusercontent.com/u/2596367?v=4',
      'Dream4ever',
      'Dream4ever',
      'Hello world!',
      NULL,
      NULL,
      'cnhwvista@gmail.com',
      NULL,
      74,
      8,
      19,
      0,
      NULL,
      '2012-10-19T06:26:55Z',
      '2025-01-14T03:16:02Z',
      '["Move.Movement"]',
      '[]',
      NOW(),
      NOW()
    )
ON DUPLICATE KEY UPDATE
  avatar_url = VALUES(avatar_url),
  name = VALUES(name),
  bio = VALUES(bio),
  company = VALUES(company),
  location = VALUES(location),
  email = VALUES(email),
  twitter_username = VALUES(twitter_username),
  followers = VALUES(followers),
  following = VALUES(following),
  public_repos = VALUES(public_repos),
  total_stars = VALUES(total_stars),
  popular_repo = VALUES(popular_repo),
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
