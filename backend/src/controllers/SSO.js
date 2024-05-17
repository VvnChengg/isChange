// 法一：官方
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_ID);
const jwt = require("jsonwebtoken");
const MemberAuth = require("../models/member-auth");
const Member = require("../models/member");

// Google Sign-In Authentication
const googleSignIn = async (req, res) => {
  try {
    const { tokenId } = req.body;

    if (!tokenId) {
      return res.status(400).json({ error: "TokenId is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      requiredAudience: process.env.GOOGLE_OAUTH_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user exists in your system
    let user = await MemberAuth.findOne({ email });
    if (!user) {
      // If user does not exist, create a new user
      user = await createNewUser(email, name);
    } else if (user.source == "credentials") {
      // If user exists but not google account, return error
      return res
        .status(400)
        .json({ error: "此帳號已註冊，請使用原本的帳號登入" });
    }

    // // Generate token for the user
    // const token = jwt.sign(
    //   { userId: user.user_id },
    //   process.env.JWT_SECRET_KEY,
    //   {
    //     expiresIn: "6h",
    //   }
    // );
    res.cookie("token", tokenId, { httpOnly: true, secure: true });

    return res.status(200).json({
      status: "success",
      message: "登入成功",
      data: {
        user_id: user.user_id,
        email: user.email,
        access_token: tokenId,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createNewUser = async (email, name) => {
  const user = await Member.create({
    username: name,
  });

  const userAuth = await MemberAuth.create({
    email,
    user_id: user._id,
    source: "google",
  });

  return userAuth;
};

module.exports = { googleSignIn };

// 法二：非官方
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const Member = require("../models/member.js");
// const MemberAuth = require("../models/member-auth.js");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_OAUTH_ID,
//       clientSecret: process.env.GOOGLE_OAUTH_SECRET,
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // Handle user data (e.g., save to database)
//       const existingUser = await MemberAuth.findOne({ googleId: profile.id });
//       if (existingUser) {
//         return done(null, existingUser);
//       }
//       const newMember = new Member({
//         username: profile.displayName,
//       });
//       const newMemberAuth = new MemberAuth({
//         user_id: newMember._id,
//         email: profile.emails[0].value,
//       });
//       await newMember.save();
//       await newMemberAuth.save();
//       done(null, newMemberAuth);
//     }
//   )
// );
// passport.serializeUser((Member, done) => {
//   done(null, member._id);
// });
// passport.deserializeUser((id, done) => {
//   Member.findById(id, (err, obj) => {
//     done(null, obj);
//   });
// });
