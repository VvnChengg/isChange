const Member = require("../models/member");

//查看自己的個人資料（Member)
const showMember = async (req, res) => {
  const username = req.body.username;
  res.json({ username });

  if (!username) {
    return res.status(400).json({ error: "未取得使用者名稱" });
  }
  try {
    const user = await Member.findOne({ username: username }, "intro photo");
    if (!user) {
      return res.status(404).json({ error: "會員不存在" });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//修改個人資料（Member)
const modifyMember = async (req, res) => {
  const { username, intro, photo } = req.body;
  try {
    const updatedUser = await Member.findOneAndUpdate(
      { username: username },
      {
        $set: {
          intro: intro,
          photo: photo,
        },
      },
      { new: true }
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
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//查看別人的個人資料（Member）
const showMemberDetail = async (req, res) => {
  const { viewer_username, observed_username } = req.body;
  if (!viewer_username || !observed_username) {
    return res.status(400).json({ error: "Username is missing" });
  }
  try {
    const user = await Member.findOne(
      { username: observed_username },
      "intro photo exchange_school_name region"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};

//修改密碼（MemberAuth）
const modifyPassword = async (req, res) => {};

module.exports = {
  showMember,
  modifyMember,
  showMemberDetail,
  modifyPassword,
};
