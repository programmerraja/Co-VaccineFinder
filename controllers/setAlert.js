const db = require("../models");

const setAlert = {
    createAlert:async function (req,res){

      if(req.body.email && req.body.state_id && req.body.district_id){
        
        let district=await db.Alert.findOne({ state_id: req.body.state_id,district_id: req.body.district_id});
        //if it already has just append the mail 
       
        if(!district){
             db.Alert.create({
            email: req.body.email,
            state_id: req.body.state_id,
            district_id: req.body.district_id
          })
          .then(function () {
            res.json({status:"success",message:"Alert created successfully"});
          })
          .catch(function (err) {
            console.log(err)
            res.json({ status:"failed",message: "something went wrong!" });
          });
        }
        else{
          district.email.push(req.body.email)
          district.save().then(function () {
            res.json({status:"success",message:"Alert created successfully"});
          })
          .catch(function (err) {
            console.log(err)
            res.json({ status:"failed",message: "something went wrong!" });
          });
          
        }
      }
    }
}

module.exports = setAlert;