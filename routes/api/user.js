const Router = require('koa-router');
const router = new Router();
const gravatar = require('gravatar');
// 引入模型的User
const User = require('../../models/User');

/**
 * router GET api/user/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */

router.get('/test', async ctx => {
  ctx.status = 200;
  ctx.body = { msg: 'user is start....' };
});

/**
 * route POST api/user/register
 * @desc 注册接口地址
 * @access 接口公开
 */

router.post('/register', async ctx => {
  const findResult = await User.find({ username: ctx.request.body.username });
  if (findResult.length > 0) {
    ctx.status = 500;
    ctx.body = { username: '用户名重复' };
  } else {
    const avatar = gravatar.url(ctx.request.body.username, { s: '200', r: 'pg', d: 'mm' });
    const newUser = new User({
      username: ctx.request.body.username,
      avatar,
      password: ctx.request.body.password
    });
    //存储到数据库
    await newUser
      .save()
      .then(res => {
        ctx.body = res;
      })
      .catch(err => {
        console.log(err);
      });

    //返回数据
    ctx.body = newUser;
  }
});

/**
 * route POST api/user/login
 * @desc 登录接口地址 返回token
 * @access 接口公开
 */

router.post('/login', async ctx => {
  //先查询是否有这个用户
  const findResult = await User.find({ username: ctx.request.body.username, password: ctx.request.body.password });
  console.log(findResult[0].username, findResult[0].password);
  if (!findResult[0].username) {
    ctx.status = 404;
    ctx.body = { message: '用户不存在' };
  } else if (findResult[0].password) {
    // 如果有用户，验证密码
    //console.log(findResult);
    ctx.status = 200;
    ctx.body = { message: '登录成功' };
  } else {
    ctx.status = 500;
    ctx.body = { message: '密码错误' };
  }
});

module.exports = router.routes();
