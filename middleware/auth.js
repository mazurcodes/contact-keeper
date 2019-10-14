const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get token from header
  let token = req.header('x-auth-token') || req.header('authorization');
  if (!token) return res.status(401).json({error: "No token - please send request with header 'x-auth-token' that contain authorization token"});
  if (token.startsWith("Bearer") || token.startsWith("bearer")) {
    token = token.split(" ")[1];
  }
  
  // try to decode token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next()
  } catch (err) {
    res.status(401).json({ error: "Token is not valid"})
  }
}