const Member = require("../models/member");
const MemberAuth = require("../models/member-auth");
const bcrypt = require("bcrypt");

//查看自己的個人資料（Member)
const showMember = async (req, res) => {
  const { userId, username } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "未取得使用者資訊" });
  }
  try {
    const userAuth = await MemberAuth.findOne({ _id: userId });
    const user = await Member.findOne({
      _id: userAuth.user_id,
      username: username,
    });

    if (!user) {
      console.log(`Member not found with ID: ${userId}`);
      return res.status(404).json({ error: "會員不存在" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//修改個人資料（Member)
const modifyMember = async (req, res) => {
  const {
    userId,
    username,
    intro,
    photo,
    exchange_school_email,
    origin_password,
    new_password,
  } = req.body;

  if (!origin_password || !new_password) {
    try {
      const userAuth = await MemberAuth.findOne({ _id: userId });
      const updatedUser = await Member.findOneAndUpdate(
        { _id: userAuth.user_id, username: username },
        {
          $set: {
            intro: intro,
            photo: photo,
            exchange_school_email: exchange_school_email,
          },
        },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({
        status: "success",
        message: "User information updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ error: errors.join(", ") });
      }
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    try {
      const user = await MemberAuth.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const passwordMatch = await bcrypt.compare(
        origin_password,
        user.password
      );

      if (passwordMatch) {
        const h_Password = await hashPassword(new_password);

        const updatedUser = await MemberAuth.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              password: h_Password,
            },
          },
          { new: true, runValidators: true }
        );
        return res.json({
          status: "success",
          message: "密碼修改成功",
        });
      }
      return res.json({
        status: "error",
        message: "密碼錯誤",
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ error: errors.join(", ") });
      }
      console.error(error);
      return res.status(500).json({ error: "修改失敗請稍後再試" });
    }
  }
};

//查看別人的個人資料（Member）
const showMemberDetail = async (req, res) => {
  const userId = req.body;
  const observed_username = req.params.uid;

  if (!userId || !observed_username) {
    return res.status(400).json({ error: "Username is missing" });
  }
  try {
    const observed_user = await Member.findOne(
      { username: observed_username },
      "intro photo exchange_school_name region"
    );
    if (!observed_user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(observed_user);
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    res.status(500).json({ error: "Failed to fetch user info" });
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

module.exports = {
  showMember,
  modifyMember,
  showMemberDetail,
};
