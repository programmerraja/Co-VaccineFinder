var mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema(
  {
   email: { type : Array , "default" : [] },
   state_id:{
     type:Number,
    required:true
   },
   district_id:{
     type:Number,
    required:true
   }
  }
);

const Alert = mongoose.models.Alert || mongoose.model("Alert", AlertSchema);

module.exports = Alert;
