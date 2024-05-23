const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ssoController = require("../controllers/SSO");

// 法一：官方
router.post("/googleSignIn", ssoController.googleSignIn);

// 法二：非官方
// const passport = require("passport");
// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       error: false,
//       message: "Successfully Logged In",
//       user: req.user,
//     });
//   } else {
//     res.status(403).json({ error: true, message: "Not Authorized" });
//   }
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     error: true,
//     message: "Log in failure",
//   });
// });

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
