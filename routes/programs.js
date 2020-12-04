const express = require("express");
const router = express.Router();
const progCntl = require("../controllers/programController.js");

router.get("/", progCntl.findAll);
router.post("/", progCntl,create);

module.exports = router;