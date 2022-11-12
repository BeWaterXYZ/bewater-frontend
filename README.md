# bewater-website

This repo is managed via [PNPM](https://pnpm.io).

## Requirements
Node >= 16.5
pnpm >= 7

## Recipes

* Install dependencies
  * `pnpm install`
* Start dev website
  * `pnpm dev`
* Build website
  * `pnpm build`
* Export website
  * `pnpm export`
* Lint everything
  * `pnpm lint`
* View UI Components in Storybook
  * `pnpm storybook`

### Mock/Local  mode
add the following to `.env.local`

```
AUTH_REQUIRED=true
MOCK_MODE=true
NEXT_PUBLIC_BASE_PATH=
ENVIRONMENT=local
```

Example url:
`http://localhost:3000/auth-connect-wallet`

## Github Workflows
For CI (triggered at PR), we should
* run eslint
* run all the tests (Not done yet)

For CD (triggered by create new release with tag), we should
* run eslint
* run all the tests
* deploy the project
  * build & publish directly to QA Server
