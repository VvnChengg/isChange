const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member");
const validateToken = require("../../src/middlewares/validateToken");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/edit-page", validateToken, memberController.showMember);
router.patch(
  "/edit-page",
  upload.single("photo"),
  validateToken,
  memberController.modifyMember
);
router.get("/:uid", memberController.showMemberDetail); //非會員也可以查看資料
router.delete("/delete", memberController.deleteTestMember); //後端測試用

module.exports = router;
