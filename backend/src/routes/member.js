const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member");
const validateToken = require("../middlewares/validateToken");
const upload = require("../middlewares/member");

router.get("/edit-page", validateToken, memberController.showMember);
router.patch("/edit-page", validateToken, memberController.modifyMember);
router.patch(
  "/edit-page/photo",
  upload,
  validateToken,
  memberController.changeAvatar
);
router.get("/:uid", memberController.showMemberDetail); //非會員也可以查看資料
router.delete("/delete", memberController.deleteTestMember); //後端測試用

module.exports = router;
