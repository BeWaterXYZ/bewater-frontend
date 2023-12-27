# bewater-website

This repo is managed via [Yarn](https://yarnpkg.com).

## Requirements
Node >= 18
pnpm >= 8.10.3

## Recipes

* Install dependencies
  * `pnpm install`

* Start dev website with qa backend server
  * set `ENVIRONMENT=qa` in `.env` file
  * `pnpm dev`

* Build website
  * `pnpm build`
* Export website
  * `pnpm export`
* Lint everything
  * `pnpm lint`


### .env file
```

# configs for change dev conditions

# base path from next.js\
# ref: https://nextjs.org/docs/api-reference/next.config.js/basepath
NEXT_PUBLIC_BASE_PATH=
# mapping different api url for different environment
# local | qa | prod
ENVIRONMENT=local
```

