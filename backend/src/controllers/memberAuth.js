const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const MemberAuth = require("../models/member-auth");
const Member = require("../models/member");
const jwt = require("jsonwebtoken");

require("dotenv").config(); // 加了這行就可以抓到 mailer

// 使用者輸入信箱後，判斷是否是會員，回傳一個狀態（若是進入登入頁面，否則進入註冊）
const LOR = async (req, res) => {
  const { email } = req.query;
  // console.log(email);
  if (!email) {
    return res.status(400).json({ error: "Email cannot be empty" });
  }
  try {
    const existingUser = await MemberAuth.findOne({ email });
    if (existingUser && existingUser.password) {
      return res.status(200).json({ status: "success" });
    } else if (existingUser && existingUser.source === "google") {
      return res.status(401).json({ status: "google" });
    }
    return res.status(404).json({ status: "None" });
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

  try {
    const user = await MemberAuth.findOne({
      email: data.email,
    });
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Email不存在",
      });
    } else if (!user.password) {
      return res.status(404).json({
        status: "error",
        message: "請進行驗證碼驗證",
      });
    }
    // console.log(user);
    // Check if password correct
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "6h",
      });
      res.cookie("token", token, { httpOnly: true, secure: true });

      return res.status(200).json({
        status: "success",
        message: "登入成功",
        data: {
          user_id: user.user_id,
          email: user.email,
          access_token: token,
          source: user.source,
        },
      });
    } else {
      return res.status(400).json({
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
  const user = await MemberAuth.findOne({ email });

  // create member and memberAuth in database
  if (!user) {
    //註冊
    await MemberAuth.create({
      email: email,
      verification_code: code,
      source: "credentials",
    });
  } else {
    //忘記密碼
    await MemberAuth.updateOne({ email }, { verification_code: code });
  }

  // send email
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "isChange Verification Code",
      text: `Your verification code is: ${code}`,
    });

    res.status(200).json({
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

//輸入驗證碼進行驗證
const verifyRegisterMember = async (req, res) => {
  const { email, verification_code } = req.body;

  try {
    const user = await MemberAuth.findOne({ email });
    if (!user && !user.password) {
      //還沒註冊過的會員，也還沒有信箱驗證
      return res.status(400).json({
        status: "error",
        message: "電子郵件尚未驗證，請申請驗證碼",
      });
    } else if (!user || user.verification_code !== verification_code) {
      return res.status(400).json({
        status: "error",
        message: "電子郵件驗證失敗，請確認您的驗證碼是否正確",
      });
    }

    //已經註冊過的會員忘記密碼 or 還沒有註冊過的會員要設定密碼
    const updatedUser = await MemberAuth.findOneAndUpdate(
      { email },
      { is_verified: true }
    );
    res.status(200).json({
      status: "verified",
      message: "電子郵件驗證成功",
      // data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

//檢查使用者名稱有無重複
const checkUsername = async (req, res) => {
  const { username, email } = req.query;
  const m0 = await Member.findOne({ username: username });
  if (!m0) {
    return res.status(200).json({
      status: "success",
      message: "可使用此名稱",
    });
  }
  return res.status(409).json({
    status: "failed",
    message: "使用者名稱已有人使用，請更換其他名稱",
  });
};

//設定密碼、使用者名稱、交換學校名稱
const verifiedMember = async (req, res) => {
  const { email, password, username, exchange_school_name } = req.body;

  try {
    //設定密碼
    const hashedPassword = await hashPassword(password);
    const user = await MemberAuth.findOne({ email });
    if (user.password) {
      return res.status(400).json({
        status: "failed",
        message: "使用者已設定過密碼，請登入",
        data: email,
      });
    } else if (user) {
      //未設定過密碼，設定member auth和member
      const m = await Member.create({
        username: username,
        exchange_school_name: exchange_school_name,
      });

      const ma = await MemberAuth.findOneAndUpdate(
        { email },
        { user_id: m._id, password: hashedPassword },
        { new: true }
      );

      return res.status(200).json({
        status: "success",
        message: "註冊成功！",
        data: m,
      });
    }

    // If user doesn't exist, return failed message
    return res.status(404).json({
      status: "failed",
      message: "使用者不存在！",
      data: email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const forgetPwd = async (req, res) => {
  const { email, password } = req.body;
  try {
    // hash password
    const hashedPassword = await hashPassword(password);
    // reset password
    const user = await MemberAuth.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );
    return res.status(200).json({
      status: "success",
      message: "密碼已重設",
      data: user.email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "重設失敗，請稍後再試" });
  }
};

const deleteTestMember = async (req, res) => {
  const { email } = req.body; // Extract email from request body
  try {
    // Assuming MemberAuth is your Mongoose model
    const m = await MemberAuth.findOne({ email });
    if (m) {
      let memberId = m.user_id;
      const deletedMemberAuth = await MemberAuth.deleteOne({ email });
      const deletedMember = await Member.deleteOne({
        _id: memberId,
      });
      console.log(`${deletedMember.deletedCount} member(s) deleted.`);
      console.log(`${deletedMemberAuth.deletedCount} member(s) auth deleted.`);

      return res.status(200).json({
        status: "success",
        message: "Deleted successfully",
        data: email,
      });
    }
    return res.status(404).json({
      status: "failed",
      message: "no existing user",
      data: email,
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
  checkUsername,
  verifiedMember,
  forgetPwd,
  deleteTestMember,
};
