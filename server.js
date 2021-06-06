//node modules
const express = require("express");
const path = require("path");
const routes=require("./routes");
const getVaccineData=require("./util/checkVaccine");

const mongoose = require("mongoose");
const app = new express();

app.use(express.json());

// setting value
app.set("view engine", "ejs");
app.set("views", "./views");

let port = process.env.PORT || 3000;
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/covaccine", {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify: false, 
  useCreateIndex: true
});

//calling function for every 5 min 
setInterval(getVaccineData,300000);

//routing
app.use("/public", express.static(path.join(__dirname + "/public")));
app.use(routes)
app.get("/",(req,res)=>{
	res.render("index");
})

//404 page
app.get("/*", (req, res) => {
  res.render("error");
})

process.on("uncaughtException", (error) => {
  console.log("uncaughtException", error)
})

app.listen(port, () => {
  console.log("server started")
});