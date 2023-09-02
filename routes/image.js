const express = require("express");
const router = express.Router();
const imageCtrl = require("../controllers/image");

router.post("/", imageCtrl.postImage);
router.delete("/", imageCtrl.deleteImage);

module.exports = router;
