const Router = require('koa-router');
const router = new Router();

// 引入模型的User
const User = require("../../models/User")

/**
 * router GET api/user/test
 * @desc 测试接口地址
 * @access 接口是公开的 
 */ 

router.get("/test", async ctx=>{
    ctx.status =200;
    ctx.body = {msg:'user is start....'}
}) 

/**
 * route POST api/user/register 
 * @desc 注册接口地址
 * @access 接口公开
 */

 router.post("/register", async ctx=>{
  console.log(ctx.request.body);
}) 

module.exports = router.routes();