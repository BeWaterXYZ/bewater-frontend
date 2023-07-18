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

metadata字段如果不用，为null，否则是一个json。当前定义了以下字段，如果存在优先使用

例如：假如赛事标题不需要多语言支持，就使用原有 title 字段，不需要设置 metadata 里面的 entitle 和 zhtitle。

```json
      "metadata": {
        "entitle": "英文title(例如：Neo APAC Hackathon)",
        "endescription": "",
        "enrequirements": "",
        "enreviewDimension": "Coming soon",
        "zhtitle": "中文title，例如：Neo APAC 黑客松",
        "zhdescription": "中文赛事描述",
        "zhrequirements": "中文赛事要求",
        "zhreviewDimension": "中文评审维度",
        "judges": [
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
