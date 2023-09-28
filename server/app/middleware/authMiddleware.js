const jsonwebtoken = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.header('Authorization');

  console.log

  if (!token) {
    return res.status(401).json({ message: 'Chưa cung cấp token' });
  }

  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token không hợp lệ' });
    }

    req.user = user;
    next();
  });
}

module.exports = isAuthenticated;