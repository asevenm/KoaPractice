const router = require('koa-router')();
const languageRouters = require('./language');
const userRouters = require('./user');

router.use(languageRouters.routes());
router.use(userRouters.routes());

router.get('*', async (ctx) => {
  switch(ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>Page not found</p>'
    case 'json':
      ctx.type = 'json';
      ctx.body = {
        message: 'Page not found',
      };
  }
});

module.exports = router;