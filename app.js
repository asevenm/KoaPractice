const Koa = require('koa');
const json = require('koa-json');
const render = require('koa-ejs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const router = require('./src/routers');


const dirs = fs.readdirSync(path.resolve(__dirname, 'src'));
console.log(dirs);
console.log(process.cwd());

const app = new Koa();

app.use(json());

app.use(bodyParser());

render(app, {
    root: path.join(__dirname, 'src/views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false,
});

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server started at port 3000...'));