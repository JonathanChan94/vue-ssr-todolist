const jwt = require('jsonwebtoken');
const env = require('../../env');

module.exports = (req, res, next) => {
  let token = req.cookies.token;
  if (token) {
    jwt.verify(token, env.secret, function (err, decoded) {
      if (err) {
        res.cookie('token', {maxAge: 0});
        res.json({code: 1000, msg: 'token失效，请重新登录'});
      } else {
        req.name = decoded.name;
        // 每次操作了之后重新设置token过期时间
        var newToken = jwt.sign({ name: decoded.name }, env.secret, {
          expiresIn: 60 * 60
        })
        res.cookie('token', newToken, {maxAge: 1000 * 60 * 60});
        next();
      }
    })
  } else {
    res.json({code: 1000, msg: '登录失效，请重新登录'});
  }
}