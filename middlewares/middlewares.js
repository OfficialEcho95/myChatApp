const User = require("../model/userModel");
const { verifyToken } = require("../util/helpers");

exports.authMiddleware = async (req, res, next) => {
  // get token from header
  const token = req.session.token
    ? req.session.token
    : req.headers?.authorization?.split(" ")[1];

  //verify token
  const verifiedToken = verifyToken(token);

  if (!verifiedToken) {
    return res.status(401).json({ message: "Token expired or Invalid" });
    // return next();
  } else {
    const user = await User.findById(verifiedToken.id);
    req.user = user;
    next();
  }
};
