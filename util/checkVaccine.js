const axios = require('axios');
const db = require("../models");
const {sendAlertMail,createMailBody}=require("./sendMail");

const header={
	"content-type":"application/json",
	"Accept-Language": "hi_IN",
	"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Mobile Safari/537.36"
}
function getTodayDate() {
	let today=new Date();
	let date=today.getDate()>10?today.getDate():"0"+today.getDate();
	let month=(today.getMonth()+1)
	month=month>10?month:"0"+month;
	let year=today.getFullYear();
	return date+"-"+month+"-"+year
}

 async function getVaccineData(){
 	try{
		 	let alerts=await db.Alert.find({});
		 	if(alerts.length>0){
		 	  for( i=0;i<alerts.length;i++){
		 	  	let body="";
		 		const link="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+alerts[i].district_id+"&date="+getTodayDate();
				let res=await axios.get(link,headers=header)
				let sessions=res.data;
				sessions["sessions"].forEach((session)=>{
					if(session["available_capacity"]>0 && (session["fee"]==="0" || session["fee_type"]==="Free")){
						body=createMailBody(body,session);
					}	
					});
				//send mail only if session avalible
				if(body){
			 	   for(k=0;k<alerts[i].email.length;k++){
			 	   		sendAlertMail(alerts[i].email[k],body);
			 	   }
			 	}
		 	  }

		 	}
	}
	catch(e){
		console.log("error when getting sessions",e.message);
	}
}
module.exports=getVaccineData;