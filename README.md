# bewater-website

This repo is managed via [Yarn](https://yarnpkg.com).

## Requirements
Node >= 16.8
yarn >= 1.22.15

## Recipes

* Install dependencies
  * `yarn install`

* Start dev website with qa backend server
  * set `ENVIRONMENT=qa` in `.env` file
  * `yarn dev`

* Build website
  * `yarn build`
* Export website
  * `yarn export`
* Lint everything
  * `yarn lint`


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

### metadata的用途

```json
      "metadata": {
        "entitle"?: "Neo APAC Hackathon",
        "endescription"?: "",
        "enrequirements"?: "",
        "enreviewDimension"?: "Coming soon",
        "zhtitle"?: "Neo APAC 黑客松",
        "zhdescription"?: "",
        "zhrequirements"?: "",
        "zhreviewDimension"?: "更多...",
      }
```
