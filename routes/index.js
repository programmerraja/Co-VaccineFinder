const router = require("express").Router();
const setAlert = require("./setAlert");


router.use("/", setAlert);

module.exports = router;
