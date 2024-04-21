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
); //修改會員資料
router.get("/:uid", memberController.showMemberDetail); //非會員也可以查看其他會員資料頁
router.patch("/student-verification", memberController.studentVerification); //學生認證
router.delete("/delete", memberController.deleteTestMember); //後端測試用

module.exports = router;
