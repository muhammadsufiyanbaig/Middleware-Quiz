const { verifyToken } = require('./jwtUtils');
function authenticate(req, res, next) {
  const token = req.cookies.token;
 if (!token) {
    return res.status(403).json({ error: 'Please Login your account' });
  }
  verifyToken(token)
    .then(decoded => {
      req.user = decoded; 
      next();
    })
    .catch(err => {
      res.status(401).json({ error: 'Unauthorized' });
    });
}
module.exports = authenticate;