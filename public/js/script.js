
// async function getVaccineData(){
// 	let district_id=document.querySelector("#district").value
// 	let cards=document.querySelector(".cards");
// 	const link="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+district_id+"&date="+getTodayDate();
// 	if(district_id){
// 		let res=await fetch(link,headers=header)
// 		let sessions=await res.json();
// 		console.log(sessions)
// 		cards.innerHTML=""
// 		console.log(cards)
// 		sessions["sessions"].forEach((session)=>{
// 			   let slotsHtml="";
// 				for(let i=0;i<=session.slots.length-2;i+=2){
// 					slotsHtml+="<span class='slot'>"+session.slots[i]+"  "+session.slots[i+1]+"</span>";
// 				}
// 			   cards.innerHTML+=`<div class="card">
// 										<div class="card_head">
// 											 <div>
// 												<h4>${session.name}</h4>
// 												<small>${session.address}</small>
// 												<small>${session.block_name}</small>
// 												<small>${session.date}</small>
// 											 </div>
// 										</div>
// 										<div class="card_body">
// 											<div class="body_left"> 
// 												<p >from:<span class="value">${session.from}</span></p>
// 												<p>to:<span class="value">${session.to}</span></p>
// 												<p>age limit:<span class="value">${session.min_age_limit}</span></p>
// 												<p class="fee_type-${session.fee_type}">fee type:<span class="value">${session.fee_type}</span></p>
// 											</div>
// 											<div class="body_right">
// 												<p>slots:<span class="value">${slotsHtml}</span></p>
// 												<p class="vaccine-${session.vaccine}">vaccine:<span class="value">${session.vaccine}</span></p>
// 												<p>available capacity dose1:<span class="value">${session.available_capacity_dose1}</span></p>
// 												<p>available capacity dose2:<span class="value">${session.available_capacity_dose2}</span></p>

// 											</div>
// 										</div>
// 										<div class="card_footer">
// 												<p class="pincode-${session.pincode}">pincode:<span class="value">${session.pincode}</span></p>
// 										</div>
// 									</div>`
// 		})

// 	}
// }
const header={
	"content-type":"application/json",
	"Accept-Language": "hi_IN",
	"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Mobile Safari/537.36"
}
async function getDistricts() {
	let state_id=document.querySelector("#states").value
	if(state_id){
		let  select = document.querySelector('#districts');
		const link="https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+state_id;
		let res=await fetch(link,headers=header)
		let districts=await res.json();
		select.innerHTML=""
		districts["districts"].forEach((dis)=>{
			    var opt = document.createElement('option');
			    opt.value = dis.district_id;
			    opt.innerHTML = dis.district_name;
			    select.appendChild(opt);
		})
	}
}


async function setAlert()
{
	let email=document.querySelector(".email").value;
	let state=document.querySelector("#states").value;
	let district=document.querySelector("#districts").value;
	let body =JSON.stringify({
		email:email,
		state_id:state,
		district_id:district
	})
	if(email && state && district){
		document.querySelector(".loading_container").classList.toggle("invisible");
		let res=await fetch("/setAlert",{
											method:"POST",
											headers:{
												"content-type":"application/json"
											},
											body:body
										});
		res=await res.json();
		document.querySelector(".loading_container").classList.toggle("invisible");
		if(res["status"]==="success"){
			alert(res["message"]);
		}
		else{
			alert(res["message"]);
		}
	}
}
