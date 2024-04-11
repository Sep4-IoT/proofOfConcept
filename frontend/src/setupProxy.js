const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://javierperalta.dk',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }));
};
