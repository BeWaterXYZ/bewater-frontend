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
        "entitle"?: "Neo APAC Hackathon", // 英文title
        "endescription"?: "",
        "enrequirements"?: "",
        "enreviewDimension"?: "Coming soon",
        "zhtitle"?: "Neo APAC 黑客松",    // 中文title
        "zhdescription"?: "",
        "zhrequirements"?: "",
        "zhreviewDimension"?: "更多...",
        "judges": [ // 支持裁判分类
          {
            "name": "生态评审嘉宾",
            "data": [
              {
                "name": "Sam",
                "title": "Arweave 创始人",
                "avatarURI": "https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/sam.png"
              }
            ]
          },
          {
            "name": "赞助评审嘉宾",
            "data": [
              {
                "name": "郝志煜",
                "title": "AWS Web3 Tech Lead",
                "avatarURI": "https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/20230706154829.jpg"
              }
            ]
          }
        ],
        "eventDetails": {
          "zhcontent": "中文详情",
          "encontent": "Event Details" // 如果不需要支持多语言，就只需要给encontent赋值，让zhcontent不存在
        }
      }
```
