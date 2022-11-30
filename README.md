# bewater-website

This repo is managed via [Yarn](https://yarnpkg.com).

## Requirements
Node >= 16.8
yarn >= 1.22.15

## Recipes

* Install dependencies
  * `yarn install`
* Start dev website with local mock mode
  * set `ENVIRONMENT=local` in `.env.local` file
  * `yarn dev`
* Start dev website with qa backend server
  * set `ENVIRONMENT=qa` in `.env.local` file
  * `yarn dev`
* Debug with local backend server
  * set `ENVIRONMENT=local` in `.env.local` file
  * `yarn dev:proxy`
* Build website
  * `yarn build`
* Export website
  * `yarn export`
* Lint everything
  * `yarn lint`
* View UI Components in Storybook
  * `yarn storybook`

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

Storybook Review Url:
`https://www.chromatic.com/library?appId=6385af5a3bf0976c3f78ac1e`

## Github Workflows
For CI (triggered at PR), we should
* run eslint
* run all the tests (Not done yet)

For CD (triggered by create new release with tag), we should
* run eslint
* run all the tests
* deploy the project
  * build & publish directly to QA Server
