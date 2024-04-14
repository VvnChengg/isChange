const Member = require("../models/member");
const MemberAuth = require("../models/member-auth");
const bcrypt = require("bcrypt");

//查看自己的個人資料（Member)
const showMember = async (req, res) => {
  const { username } = req.query;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "未取得使用者資訊" });
  }
  try {
    const user = await Member.findOne({
      _id: userId,
      username: username,
    });

    if (!user) {
      console.log(`Member not found with ID: ${userId}`);
      return res.status(404).json({ error: "會員不存在" });
    }
    return res.status(200).json(user);
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
      const updatedUser = await Member.findOneAndUpdate(
        { _id: userId, username: username },
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

      return res.status(200).json({
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
      // 確認有沒有會員資料
      const user = await MemberAuth.findOne({ user_id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      //確認原密碼
      const passwordMatch = await bcrypt.compare(
        origin_password,
        user.password
      );
      console.log(origin_password);
      //修改密碼
      if (passwordMatch) {
        const h_Password = await hashPassword(new_password);
        const updatedUser = await MemberAuth.findOneAndUpdate(
          { user_id: userId },
          {
            $set: {
              password: h_Password,
            },
          },
          { new: true, runValidators: true }
        );

        return res.status(200).json({
          status: "success",
          message: "密碼修改成功",
        });
      }
      return res.status(400).json({
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
  const observed_username = req.params.uid;

  if (!observed_username) {
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
    res.status(200).json(observed_user);
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

//刪除會員資料（Member, for internal testing）
const deleteTestMember = async (req, res) => {
  const { username } = req.body; // Extract email from request body
  try {
    const deletedMember = await Member.deleteMany({ username });
    console.log(`${deletedMember.deletedCount} member(s) deleted.`);

    if (deletedMember.deletedCount === 0) {
      // If no documents were deleted
      return res.status(404).json({
        status: "error",
        message: "No matching member found for deletion",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Deleted successfully",
      data: deletedMember,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  showMember,
  modifyMember,
  showMemberDetail,
  deleteTestMember,
};
