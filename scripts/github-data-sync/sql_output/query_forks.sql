
-- 查询所有 fork 的项目信息
SELECT 
  id,
  repoName,
  name,
  description,
  stargazers_count,
  forks_count,
  updated_at,
  created_at
FROM operationProject
WHERE id IN (3,18,19,34,36,46,53,54,56,71,72,73,75,76,77,80,81,84,87,88,91,92,93,100,103,104,105,106,114,115,130,134,141,144,146,148,150,158,165,167,168,173,175,176,180,196,199,214,225,231,274,285,286,287,289,293,294,296,298,300,308,309,312,314,315,318,320,321,322,324,328,331,333,334,347,352,358,359,363,365,367,369,374,378,380,381,385,387,388,389,391,393,397,404,408,411,413,414,417,418,426,427,430,435,439,451,452,455,482,484,495,496,503,506,528,531,532,559,565,571,573,574,588,619,626,628,634,635,639,651,652,655,665,666,668,675,678,679,686,687,693,700,714,718,720,721,722,724,729,735,755,757,760,764,768,769,786,808,810,826,831,832,876,877,881,887,905,912,914,922,926,942,947)
ORDER BY id;