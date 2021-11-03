const koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser')

// 实例化
const app = new koa;
const router = new Router;

app.use(bodyParser())

// 引入user.js
const user = require('./routes/api/user');

// 路由
router.get('/',async ctx=>{
    ctx.body = {message:'Hello Koa'};
})

// 连接数据库
const db = require('./config/index').mongoUrl;
mongoose.connect(db)
.then(()=>{
    console.log('Mongodb Connectd');
}).catch(err=>{
    console.log(err);
})

//配置路由地址
router.use('/api/user',user)

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

// 监听端口号
app.listen(port,()=>{
    console.log(`server started on ${port}`)
})