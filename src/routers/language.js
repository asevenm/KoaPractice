const router = require('koa-router')();
const languageController = require('../controllers/languages');

router.get('/', async ctx => {
    await ctx.render('index', {
        title: 'Hello world'
    });
});

router.get('/test', ctx => ctx.body = { msg: 'Hello test' });

router.get('/language', languageController.getLanguages);

router.get('/languageList', languageController.getLanguageList);

router.post('/language', languageController.saveLanguagePost);

router.get('/addLan/:name', languageController.saveLanguage);

router.get('/delLan/:name', languageController.deleteLanguage);

router.post('/delLan', languageController.deleteLanguage);

router.post('/updateLan', languageController.updateLanguage);

router.get('/players/:id', ctx => ctx.body = {
    name: ctx.params.id,
});


module.exports = router;