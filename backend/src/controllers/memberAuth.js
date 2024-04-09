const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const MemberAuth = require("../models/member-auth");
const Member = require("../models/member");
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
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(data);

  try {
    const user = await MemberAuth.findOne({
      email: data.email,
    });
    // Check if user exists
    if (!user) {
      return res.json({
        status: "error",
        message: "Email不存在",
      });
    }
    // Check if password correct
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (passwordMatch) {
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

  await MemberAuth.create({
    email: email,
    verification_code: code,
    source: "credentials",
  });

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
      message: "驗證碼已寄出",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "驗證碼寄送失敗，請稍後再試",
    });
  }
};

//確認驗證碼與記錄相符
const verifyRegisterMember = async (req, res) => {
  const { email, verification_code } = req.body;

  try {
    const user = await MemberAuth.findOne({ email });
    if (!user || user.verification_code !== verification_code) {
      return res.status(400).json({
        status: "error",
        message: "電子郵件驗證失敗，請確認您的驗證碼是否正確",
      });
    }

    const updatedUser = await MemberAuth.findOneAndUpdate(
      { email },
      { is_verified: true }
    );
    res.json({
      status: "verified",
      message: "電子郵件驗證成功",
      // data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const verifiedMember = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await MemberAuth.findOne({ email });

    // If user is not verified, update password and return success
    if (user && !user.is_verified) {
      await MemberAuth.findOneAndUpdate(
        { email },
        { password: hashedPassword }
      );
      return res.json({
        status: "success",
        message: "註冊成功！",
        data: email,
      });
    }

    // If user is already verified, return failed message
    if (user && user.is_verified) {
      return res.json({
        status: "failed",
        message: "email已存在！",
        data: email,
      });
    }

    // If user doesn't exist, return failed message
    return res.json({
      status: "failed",
      message: "使用者不存在！",
      data: email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTestMember = async (req, res) => {
  const { email } = req.body; // Extract email from request body
  try {
    // Assuming MemberAuth is your Mongoose model
    const deletedMember = await MemberAuth.deleteOne({ email });

    if (deletedMember.deletedCount === 0) {
      // If no documents were deleted
      return res.status(404).json({
        status: "error",
        message: "No matching member found for deletion",
      });
    }

    // If deletion was successful
    return res.json({
      status: "success",
      message: "Deleted successfully",
      data: email, // Assuming you want to return the deleted email
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
  deleteTestMember,
};
