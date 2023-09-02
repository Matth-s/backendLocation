const express = require("express");
const router = express.Router();
const materialCtrl = require("../controllers/material");

router.get("/", materialCtrl.getAllData);
router.get("/:id", materialCtrl.getDataById);
router.delete("/:id", materialCtrl.deleteDataById);
router.post("/", materialCtrl.postMaterial);
router.put("/:id", materialCtrl.updateMaterial);

module.exports = router;
