const jwt = require("jsonwebtoken");
const Member = require("../models/member");
const MemberAuth = require("../models/member-auth");

async function validateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied, no token exists" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    // req.body.userId = decoded.userId;

    // Fetch data from MongoDB using an asynchronous operation
    const auth = await MemberAuth.findOne({ _id: decoded.userId });
    const member = await Member.findOne({ _id: auth.user_id });
    if (!member) {
      return res.status(404).json({ error: "User data not found" });
    }
    req.body.userId = member._id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = validateToken;
