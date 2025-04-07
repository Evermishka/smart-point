const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/categories", require("./category"));
router.use("/products", require("./product"));

module.exports = router;