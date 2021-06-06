var nodemailer = require('nodemailer');
require("dotenv").config();

function sendMail(subject,body,to_mail)
{
	 return new Promise((resolve,reject)=>{
			var transporter = nodemailer.createTransport({
			  service: 'gmail',
			  auth: {
			    user: process.env.EMAIL,
			    pass: process.env.PASSWORD
			  }
			});

			var mailOptions = {
			  from:process.env.EMAIL,
			  to: to_mail,
			  subject: subject,
			  html:body
			};

			transporter.sendMail(mailOptions, function(err, info){
			  if(err) {
					console.log("Error when sending mail to to_mail",err)
					 resolve(false);
			  } else {
			    console.log('Email sent: ' + info.response);
			      resolve(true);
			  }
			});
	});
}

function createMailBody(body,session) {
	body+=`<h4>${session.name}</h4>
				<p>${session.address}</p>
				<p>${session.block_name}</p>
				<p>${session.date}</p>
				<p>From:  <span>${session.from}</span></p>
				<p>To:  <span>${session.to}</span></p>
				<p>Age limit:  <span>${session.min_age_limit}</span></p>
				<p>Fee type:  <span>${session.fee_type}</span></p>
				<p>Slots:  <span>${session.slots}</span></p>
				<p>Vaccine:  <span>${session.vaccine}</span></p>
				<p>Available capacity dose1:  <span>${session.available_capacity_dose1}</span></p>
				<p>Available capacity dose2:  <span>${session.available_capacity_dose2}</span></p>
				<p>Pincode:  <span>${session.pincode}</span></p>
				<hr>`
	return body;
}

async function sendAlertMail(to_mail,body)
{
	let subject="You Has Alert";
	let mailBody="<p>Hai User we have good information for you we found free vaccine center  </p>"+body
	let msg=await sendMail(subject,body,to_mail);
	return msg;

}

module.exports={sendAlertMail,createMailBody};