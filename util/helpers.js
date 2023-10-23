const jwt = require("jsonwebtoken");

exports.generateToken = (id) => {
  return jwt.sign({ id }, "anykey", { expiresIn: "5d" });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, "anykey", (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

const bcrypt = require("bcryptjs");

//hash password
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.isPassMatched = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
