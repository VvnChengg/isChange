const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member");
const validateToken = require("../../src/middlewares/validateToken");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/edit-page", validateToken, memberController.showMember); //顯示個人資料
router.patch(
  "/edit-page",
  upload.single("image"),
  validateToken,
  memberController.modifyMember
);
router.patch(
  "/stud-ver-code",
  validateToken,
  memberController.studentVerificationCode
);
// router.patch("/stud-ver", validateToken, memberController.studentVerification);
// router.get("/:uid", memberController.showMemberDetail); //非會員也可以查看資料
// router.delete("/delete", memberController.deleteTestMember); //後端測試用
// router.put("/follow/:uid", validateToken, memberController.followUser);
// router.get("/posts/:uid", memberController.getUserPosts);
// router.get("/followers", validateToken, memberController.getFollowingList);

router.patch("/stud-ver", validateToken, memberController.studentVerification);
router.get("/:uid", memberController.showMemberDetail);
router.delete("/delete", memberController.deleteTestMember);
router.put("/follow/:uid", validateToken, memberController.followUser);
router.get("/posts/:uid", memberController.getUserPosts);
router.get("/following", validateToken, memberController.getFollowingList);

module.exports = router;
