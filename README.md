# bewater-website

This repo is managed via [PNPM](https://pnpm.io).

## Requirements
Node >= 16.5
pnpm >= 7

## Recipes

* Install dependencies
  * `pnpm install`
* Start dev website with local mock mode
  * set `ENVIRONMENT=local` in `.env.local` file
  * `pnpm dev`
* Start dev website with qa backend server
  * set `ENVIRONMENT=qa` in `.env.local` file
  * `pnpm dev`
* Debug with local backend server
  * set `ENVIRONMENT=local` in `.env.local` file
  * `pnpm dev:proxy`
* Build website
  * `pnpm build`
* Export website
  * `pnpm export`
* Lint everything
  * `pnpm lint`
* View UI Components in Storybook
  * `pnpm storybook`

### .env file
```
# config for local mock
MORALIS_API_KEY
MORALIS_APP_DOMAIN
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# configs for change dev conditions
# user need connect wallet before visit pages(except connect-wallet page)
AUTH_REQUIRED=true
# base path from next.js\
# ref: https://nextjs.org/docs/api-reference/next.config.js/basepath
NEXT_PUBLIC_BASE_PATH=
# mapping different api url for different environment
# local | qa | prod
ENVIRONMENT=local
```

Example url:
`http://localhost:3000/auth/connect-wallet`

## Github Workflows
For CI (triggered at PR), we should
* run eslint
* run all the tests (Not done yet)

For CD (triggered by create new release with tag), we should
* run eslint
* run all the tests
* deploy the project
  * build & publish directly to QA Server
