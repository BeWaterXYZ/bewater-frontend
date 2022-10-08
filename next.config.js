/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
    "presets": [
        "next/babel"
    ],
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd",
                "libraryDirectory":"lib",
                "style": true
            },
        ],
        [
          "@babel/plugin-transform-react-jsx",
          {
            "throwIfNamespace": false
          }
        ]
    ]
}

module.exports = nextConfig
