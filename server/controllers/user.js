const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const env = require('../../env');

const login = async (req, res) => {
  const user = await User.getUserByName({
    name: req.body.name
  });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      var token = jwt.sign({ name: user.name }, env.secret, {
        expiresIn: 60 * 60
      })
      res.cookie('token', token, {maxAge: 1000 * 60 * 60});
      res.json({code: 0, msg: '登陆成功', token: token});
    } else {
      res.json({code: 10, msg: '密码不正确'});
    }
  } else {
    res.json({code: 100, msg: '用户不存在'});
  }
}

const register = async (req, res) => {
  var psw = bcrypt.hashSync(req.body.password, salt);
  const user = await User.addUser({
    name: req.body.name,
    password: psw
  });
  if (user) {
    res.json({code: 0, msg: '注册成功'});
  } else {
    res.json({code: 100, msg: '注册失败'});
  }
}

module.exports = {
  login,
  register
}
