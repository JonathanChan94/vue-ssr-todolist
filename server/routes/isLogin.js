const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.cookies.token;
  if (token) {
    jwt.verify(token, 'test-secret', function (err, decoded) {
      if (err) {
        res.cookie('token', {maxAge: 0});
        res.json({code: 1000, msg: 'token失效，请重新登录'});
      } else {
        req.name = decoded.name;
        next();
      }
    })
  } else {
    res.json({code: 1000, msg: '登录失效，请重新登录'});
  }
}