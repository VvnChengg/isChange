const Member = require("../models/member");
const MemberAuth = require("../models/member-auth");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//查看自己的個人資料（Member)
const showMember = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "未取得使用者資訊" });
  }
  try {
    const user = await Member.findOne({
      _id: userId,
    });
    const user_auth = await MemberAuth.findOne({
      user_id: user._id,
    });

    if (!user) {
      // console.log(`Member not found with ID: ${userId}`);
      return res.status(404).json({ error: "會員不存在" });
    }

    // Convert photo data to base64
    let photoBase64 = null;
    if (user.photo && user.photo.contentType) {
      photoBase64 = `data:${
        user.photo.contentType
      };base64,${user.photo.data.toString("base64")}`;
    }
    const resData = {
      _id: user._id,
      username: user.username,
      intro: user.intro,
      photo: photoBase64,
      exchange_school_name: user.exchange_school_name,
      student_verification: user_auth.student_verification,
    };

    return res.status(200).json(resData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//修改個人資料（Member)
const modifyMember = async (req, res) => {
  const {
    userId,
    intro,
    username,
    exchange_school_name,
    origin_password,
    new_password,
  } = req.body;

  // 確認有沒有會員資料
  const user = await MemberAuth.findOne({ user_id: userId });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const updateFields = {};

  if (origin_password && new_password) {
    try {
      //確認和原密碼相符
      const passwordMatch = await bcrypt.compare(
        origin_password,
        user.password
      );
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
  } else {
    //紀錄要更新的欄位
    if (username && exchange_school_name) {
      updateFields.username = username;
      updateFields.exchange_school_name = exchange_school_name;
    } else if (intro) {
      updateFields.intro = intro;
    }

    // 看有沒有上傳圖片
    let photoData;
    if (req.file) {
      photoData = {
        photo: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    if (req.file) {
      try {
        updateFields.photo = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Failed to process photo upload" });
      }
    }

    // 更新欄位
    try {
      const updatedUser = await Member.findOneAndUpdate(
        { _id: userId },
        { $set: updateFields },
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
  }
};

//查看別人的個人資料（Member）
const showMemberDetail = async (req, res) => {
  const observed_username = req.params.uid;

  if (!observed_username) {
    return res.status(400).json({ error: "Username is missing" });
  }
  try {
    const observed_user = await Member.findOne({ username: observed_username });
    const observed_user_auth = await MemberAuth.findOne({
      user_id: observed_user._id,
    });
    if (!observed_user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Convert photo data to base64
    let photoBase64 = null;
    if (observed_user.photo && observed_user.photo.contentType) {
      photoBase64 = `data:${
        observed_user.photo.contentType
      };base64,${observed_user.photo.data.toString("base64")}`;
    }
    const resData = {
      _id: observed_user._id,
      username: observed_user.username,
      intro: observed_user.intro,
      photo: photoBase64,
      exchange_school_name: observed_user.exchange_school_name,
      student_verification: observed_user_auth.student_verification,
    };

    return res.status(200).json(resData);
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return res.status(500).json({ error: "Failed to fetch user info" });
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

//學生認證
const studentVerification = async (req, res) => {
  const { userId, exchange_school_email } = req.body;
  try {
    //檢查是否已經認證
    const user_auth = await MemberAuth.findOne({ user_id: userId });
    if (!user_auth) {
      return res.status(404).json({ error: "User not found" });
    } else if (user_auth.student_verification) {
      return res.status(400).json({ error: "已完成認證，無法再次認證" });
    }
    // 檢查信箱是否已被使用
    const user = await Member.findOne({
      exchange_school_email: exchange_school_email,
    });
    if (user && user._id != userId) {
      return res.status(400).json({ error: "Email已被使用" });
    }
    //更新認證資料
    const updatedUserAuth = await MemberAuth.findOneAndUpdate(
      { user_id: userId },
      { $set: { student_verification: true } },
      { new: true }
    );
    const updatedUser = await Member.findOneAndUpdate(
      { _id: userId },
      { $set: { exchange_school_email: exchange_school_email } },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      message: "學生身分認證成功",
      data: updatedUserAuth,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "認證失敗，請稍後再試" });
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
  studentVerification,
  studentVerification,
  deleteTestMember,
};
