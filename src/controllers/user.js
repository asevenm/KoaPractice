const User = require('../models/user');
const bcrypt = require('../utils/bcrypt');

exports.register = async (ctx) => {
  try {
    const { userName, email, gender, password } = ctx.request.body;
    const newPerson = { 
      userName, 
      email, 
      gender: gender || 'male',
      password: await bcrypt.enbcrypt(password),
      avartar: '',
      createTime: new Date().getTime(),
    };
    let alreadyExit = false;
    await User.findOne({ userName }, (error, doc) => {
      if(doc) {
        alreadyExit = true;
      }
    });
    if (!alreadyExit) {
      const person = new User(newPerson);
      await person.save();
      ctx.response.body = {
        code: 0,
        msg: '注册成功',
      }
    } else {
      ctx.response.body = {
        code: 101, 
        msg: '改用户名称已被注册！',
      }
    } 
  } catch(e) {
    console.log(e);
  }
}

exports.signIn = async (ctx) => {
  try {
    const { userName, password } = ctx.request.body;
    const user = await User.findOne({ userName });
    if (!user) {
      ctx.status = 401;
      ctx.response.body = {
        code: 101,
        msg: '该用户不存在!',
      }
    }
    const isPasswordValid = await bcrypt.validate(password, user.password);
    if (isPasswordValid) {
      ctx.response.body = {
        code: 0,
        msg: '登录成功',
        data: user,
      }
    } else {
      ctx.status = 401,
      ctx.response.body = {
        code: 101,
        msg: '密码错误',
      }
    }
  } catch(e) {
    console.log(e);
  }
}

exports.signUp = async (ctx) => {
  try {

  } catch(e) {
    console.log(e);
  }
}

exports.getUserList = async (ctx) => {
  try {
    const users = await User.find();
    ctx.response.body = {
      code: 0,
      msg: '获取成功',
      data: users,
    }
  } catch(err) {
    console.log(err);
  }
}

exports.delAllUser = async (ctx) =>  {
  try {
    await User.remove();
    ctx.response.body = {
      code: 0, 
      msg: '删除成功',
    }
  } catch(err) {
    console.log(err);
  }
}