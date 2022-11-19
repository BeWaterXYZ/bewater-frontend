const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config({ path: './.env.proxy' });

const port = process.env.PROXY_SERVER_PORT || 3001;
const app = next({ dev: true });
const handle = app.getRequestHandler();

const apiPaths = {
  '/api': {
    target: process.env.PROXY_TARGET,
    pathRewrite: {
      '^/api': '',
    },
    changeOrigin: true,
  },
};

app
  .prepare()
  .then(() => {
    if (process.env.ENVIRONMENT !== 'local') {
      throw Error(`
        Proxy server can only be run under 'local' environment, \r
        please change it in your .env.local file \r\n
        If you're trying to visit qa backend, \r
        just set environment to 'qa' in .env.local file and then run 'pnpm dev'
      `);
    }
    if (process.env.NEXT_PUBLIC_BASE_PATH !== '') {
      throw Error(`
        Proxy server can only be run without NEXT_PUBLIC_BASE_PATH settings, \r
        please remove or set it to '' in your .env.local file \r\n
      `);
    }
    const server = express();

    server.use(['/api'], createProxyMiddleware(apiPaths['/api']));

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Error:::::', err);
    process.exit(1);
  });
