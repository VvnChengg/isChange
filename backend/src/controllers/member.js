const Member = require("../models/member");
const MemberAuth = require("../models/member-auth");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
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

//學校信箱寄驗證碼
const studentVerificationCode = async (req, res) => {
  const { userId, exchange_school_email } = req.body;

  // 檢查信箱是否已被使用
  const user = await Member.findOne({
    exchange_school_email: exchange_school_email,
  });
  if (user && !user._id == userId) {
    return res.status(400).json({ error: "Email已被使用" });
  }

  // Generate a random verification code
  const code = randomstring.generate({
    length: 6,
    charset: "numeric",
  });

  const user_auth = await MemberAuth.findOne({ user_id: userId });

  if (user_auth.student_verification) {
    return res
      .status(400)
      .json({ status: "failed", message: "已完成認證，無法再次認證" });
  } else {
    await Member.updateOne(
      { _id: userId },
      {
        $set: {
          exchange_school_email: exchange_school_email,
          verification_code: code,
        },
      }
    );
  }

  // send email
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: exchange_school_email,
      subject: "isChange Student Verification Code",
      text: `Your student verification code is: ${code}`,
    });

    return res.status(200).json({
      status: "verified",
      message: "驗證碼已寄出",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "驗證碼寄送失敗，請稍後再試",
    });
  }
};

//學生認證
const studentVerification = async (req, res) => {
  const { userId, exchange_school_email, verification_code } = req.body;

  try {
    //檢查驗證碼
    const user = await Member.findOne({ exchange_school_email });
    if (user.verification_code !== verification_code) {
      //驗證碼錯誤
      return res.status(400).json({
        status: "error",
        message: "電子郵件驗證失敗，請確認您的驗證碼是否正確",
      });
    } else {
      //驗證碼正確
      const updatedUserAuth = await MemberAuth.findOneAndUpdate(
        { user_id: userId },
        { $set: { student_verification: true } },
        { new: true }
      );
      return res.status(200).json({
        status: "success",
        message: "學生身分認證成功",
        data: updatedUserAuth,
      });
    }
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

const followUser = async (req, res) => {
  const { userId } = req.body;
  const { anotherUser } = req.query; // anotherUser is the username

  try {
    // Find the user who is performing the follow/unfollow action
    const user = await Member.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the user who is being followed/unfollowed
    const userA = await Member.findOne({ username: anotherUser });
    if (!userA) {
      return res.status(404).json({ error: "Another user not found" });
    }

    let follow_list = user.follow_ids.map((id) => id.toString());

    // Check if the user is already following userA
    if (follow_list.includes(userA._id.toString())) {
      // If already following, unfollow
      user.follow_ids = follow_list.filter((id) => id !== userA._id.toString());
      res_message = "成功取消追蹤";
    } else {
      // If not following yet, follow
      user.follow_ids.push(userA._id);
      res_message = "成功追蹤";
    }

    // Save the updated user object to the database
    await user.save();

    res.status(200).json({ message: res_message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserPosts = async (req, res, next) => {
  let articles, events, products;
  let result = [];
  const { username } = req.query;

  try {
    const member = await Member.findOne({ username: username });
    articles = await Article.find({ creator_id: member._id });
    events = await Event.find({ creator_id: member._id });
    products = await Product.find({ creator_id: member._id });

    // 抽取文章需要的資訊並統一格式
    articles.forEach((article) => {
      const item = {
        _id: article._id,
        title: article.article_title,
        content: article.content,
        type: "post",
        coverPhoto: convertToBase64(article.article_pic),
        // location: article.location,
        datetime: article.post_date,
      };
      result.push(item);
    });

    events.forEach((event) => {
      const item = {
        _id: event._id,
        title: event.event_title,
        content: event.event_intro,
        type: "tour",
        coverPhoto: convertToBase64(event.event_pic),
        // location: event.location,
        datetime: event.start_time,
        currency: event.currency,
        budget: event.budget,
        end_time: event.end_time,
        people_lb: event.people_lb,
        people_ub: event.people_ub,
        status: event.status,
      };
      result.push(item);
    });

    // 抽取商品需要的資訊並統一格式
    products.forEach((product) => {
      const item = {
        _id: product._id,
        title: product.product_title,
        content: product.description,
        type: "trans",
        coverPhoto: convertToBase64(product.product_pic),
        // location: product.location,
        datetime: product.post_time,
        currency: product.currency,
        price: product.price,
        product_type: product.product_type,
        period: product.period,
        status: product.status,
        transaction_way: product.transaction_way,
      };
      result.push(item);
    });

    // 依時間倒序排序
    result.sort((a, b) => {
      return new Date(b.datetime) - new Date(a.datetime);
    });
  } catch (err) {
    return next(err);
  }
  if (result.length <= 0) {
    return res.status(500).json({ message: "使用者無創建任何內容" });
  }
  return res.status(200).json({ result });
};

const getFollowingList = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await Member.findById(userId).populate(
      "follow_ids",
      "_id username photo"
    );
    if (!user) {
      throw new Error("User not found");
    }

    const followingList = user.follow_ids.map((followedUser) => ({
      _id: followedUser._id,
      username: followedUser.username,
      photo: followedUser.photo,
    }));

    res.status(200).json(followingList);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching followed users");
  }
};

module.exports = {
  showMember,
  modifyMember,
  showMemberDetail,
  studentVerificationCode,
  studentVerification,
  deleteTestMember,
  followUser,
  getUserPosts,
  getFollowingList,
};
