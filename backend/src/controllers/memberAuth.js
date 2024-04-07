const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const MemberAuth = require("../models/member-auth");
const jwt = require("jsonwebtoken");

require("dotenv").config(); // 加了這行就可以抓到 mailer

// 使用者輸入信箱後，判斷是否是會員，回傳一個狀態（若是進入登入頁面，否則進入註冊）
const LOR = async (req, res) => {
  const email = req.body.email;
  console.log(email);
  if (!email) {
    return res.status(400).json({ error: "Email cannot be empty" });
  }
  try {
    const existingUser = await MemberAuth.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      // If user exists
      return res.json({ status: "success" });
    } else {
      // If user doesn't exist
      return res.json({ status: "None" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//加密
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // This determines the complexity of the hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Failed to hash password");
  }
};

// 系統判斷使用者email存在，跳轉到登入畫面
const login = async (req, res) => {
  console.log(req.body);
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(data);
  try {
    const hashedPassword = hashPassword(data.password);
  } catch (error) {
    return res.json({ message: "Hash fail." });
  }
  try {
    const user = await MemberAuth.findOne({ email, password: hashedPassword });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });

      return res.json({
        status: "success",
        message: "登入成功",
        data: {
          user_id: user._id,
          email: user.email,
          access_token: token,
        },
      });
    } else {
      return res.json({
        status: "error",
        message: "密碼錯誤",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//透過這個email發送驗證碼
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

//註冊並寄送驗證信
const registerMember = async (req, res) => {
  const { email } = req.body;

  // Generate a random verification code
  const code = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  console.log(code);

  try {
    // Send email with verification code
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "isChange Verification Code",
      text: `Your verification code is: ${code}`,
    });

    res.json({
      status: "verified",
      message: "Verification code has been sent",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to send verification code, please try again later",
    });
  }

  // await MemberAuth.create({ email, code });
};

//確認驗證碼與記錄相符
const verifyRegisterMember = async (req, res) => {
  const { email, verification_code } = req.body;

  try {
    // Check if verification code matches
    // const verification = await MemberAuth.findOne({
    //   email,
    //   verification_code,
    // });
    const verification = req.body.verification_code;
    console.log(verification);
    if (!verification) {
      return res.status(400).json({
        status: "error",
        message:
          "Email verification failed, please check your verification code",
      });
    }
    // Implement user registration logic here

    res.json({ status: "verified", message: "Email verification successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const verifiedMember = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    exchange_school_name: req.body.exchange_school_name,
  };

  try {
    const hashedPassword = hashPassword(data.password);
    console.log(hashedPassword);
    const updatedUser = await MemberAuth.findOneAndUpdate(
      { email: email }, // Search condition
      {
        $set: {
          password: hashedPassword,
          exchange_school_name: exchange_school_name,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return success response
    return res.json({
      status: "success",
      message: "User information updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  LOR,
  login,
  registerMember,
  verifyRegisterMember,
  verifiedMember,
};
