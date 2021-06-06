const router = require("express").Router();
const setAlert = require("../controllers/setAlert");

router.route("/setAlert").post(setAlert.createAlert);
router.route("/setAlert").get((req,res)=>{
	res.send("hai")
});



module.exports = router;
