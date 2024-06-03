const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(user, 'Sufiy@n395.', { expiresIn: '1h' });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'Sufiy@n395.', (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = { generateToken, verifyToken };
