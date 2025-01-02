interface Developer {
  html_url: string;
  avatar_url: string;
  login: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
  total_stars: number;
  popular_repo: any | null;
  created_at: string;
  updated_at: string;
  ecosystems: string[];
  sectors: string[];
}

function escapeSQLString(str: string | null): string {
  if (!str) return 'NULL';
  return `'${str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "'":
        return "''";
      case "\0":
        return "\\0";
      case "\x08":
        return "\\b";
      case "\x09":
        return "\\t";
      case "\x1a":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\"":
        return '\\"';
      case "\\":
        return "\\\\";
      case "%":
        return "\\%";
      default:
        return char;
    }
  })}'`;
}

function generateDevelopersSql(developers: Developer[]): string {
  const values = developers.map(dev => {
    const popularRepo = dev.popular_repo ? escapeSQLString(JSON.stringify(dev.popular_repo)) : 'NULL';
    const ecosystems = dev.ecosystems?.length ? escapeSQLString(JSON.stringify(dev.ecosystems)) : "'[]'";
    const sectors = dev.sectors?.length ? escapeSQLString(JSON.stringify(dev.sectors)) : "'[]'";

    return `(
      ${escapeSQLString(dev.html_url)},
      ${escapeSQLString(dev.avatar_url)},
      ${escapeSQLString(dev.login)},
      ${escapeSQLString(dev.name)},
      ${escapeSQLString(dev.bio)},
      ${escapeSQLString(dev.company)},
      ${escapeSQLString(dev.location)},
      ${escapeSQLString(dev.email)},
      ${escapeSQLString(dev.twitter_username)},
      ${dev.followers || 0},
      ${dev.following || 0},
      ${dev.public_repos || 0},
      ${dev.total_stars || 0},
      ${popularRepo},
      ${escapeSQLString(dev.created_at)},
      ${escapeSQLString(dev.updated_at)},
      ${ecosystems},
      ${sectors},
      NOW(),
      NOW()
    )`;
  });

  return `
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
${values.join(',\n')}
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
  ecosystems = JSON_MERGE_PRESERVE(ecosystems, VALUES(ecosystems)),
  updatedAt = NOW();
`;
} 