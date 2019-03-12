document.querySelector("form").addEventListener("submit",validate);
document.querySelector("#passw").addEventListener("input",pstatus);
// document.querySelector("#localite").addEventListener("change",checkForCheck);


function checkForCheck(){
	var parentInfo=document.querySelectorAll(".parent");
	if(this.checked){
			for(var i=0;i<parentInfo.length;i++){
				document.querySelector("#g_"+parentInfo[i].id.split("_")[1]).value=parentInfo[i].value;
				document.querySelector("#g_"+parentInfo[i].id.split("_")[1]).readOnly="true";
				parentInfo[i].addEventListener("input",parentGuardian);

			}
	}
	else{
		for(var i=0;i<parentInfo.length;i++){
			document.querySelector("#g_"+parentInfo[i].id.split("_")[1]).value="";
			document.querySelector("#g_"+parentInfo[i].id.split("_")[1]).removeAttribute("readOnly");
			parentInfo[i].removeEventListener("input",parentGuardian);
		}
	}
}

function parentGuardian(){
	document.querySelector("#g_"+this.id.split("_")[1]).value=this.value;
}


function pstatus(){
	var currP=document.querySelector("#passw").value,
		status=document.querySelector("#passw-status");
	if(currP.length===0){
		status.textContent="Empty";
		status.style.color="black";
	}
	else if(currP.length<8){
		status.textContent="Min. 8 characters";
		status.style.color="rgb(150,0,0)";
	}
	else if(currP.match(/^[0-9A-Za-z]+$/) && currP.length<15){
		status.textContent="Weak";
		status.style.color="#f11a1a";
	}
	else if(!currP.match(/^[0-9A-Za-z]+$/) && currP.length>15){
		status.textContent="Strong!!!";
		status.style.color="rgb(50,200,50)";
	}
	else {
		status.textContent="Okay...";
		status.style.color="rgb(255,165,0)";
	}
}


function validate(e){

	var errorMessage="<span id='error-head'>Error(s):</span>";
	var original=errorMessage;
	if(document.querySelector("#empID").value.length<1)errorMessage+="<p>Employee ID is required</p>";
	else{
		if(!document.querySelector("#empID").value.match(/^[0-9A-Za-z]+$/))errorMessage+="<p>Employee ID can only have alphanumeric characters</p>"
	}

	if(document.querySelector("#passw").value.length<8)errorMessage+="<p>Password should be more than 8 characters.</p>";

	if(document.querySelector("#passw").value!==document.querySelector("#c_passw").value)errorMessage+="<p>Password and Confirmed password do not match.</p>";
	if(document.querySelector("#passw").value.match(/'/)||document.querySelector("#c_passw").value.match(/'/))errorMessage+="<p>Invalid Character \" ' \". Re-enter passwords.</p>";




	if(document.querySelector("#emp_name").value.length<1)errorMessage+="<p>Employee Name is required.</p>";
	else{
		if(!document.querySelector("#emp_name").value.match(/^[ A-Za-z]+$/))errorMessage+="<p>Employee Name can only have alphabets</p>"
	}

	if(document.querySelector("#emp_dob").value.length<1)errorMessage+="<p>Employee Date Of Birth is required.</p>";
	else{
		var date=new Date(Date.now());
		var curYear=parseInt(date.toISOString().split("T")[0].split("-")[0]);
		var birthYear=parseInt(document.querySelector("#emp_dob").value.split("-")[0]);
		if(curYear-birthYear<15 || curYear-birthYear>110)errorMessage+="<p>Employee Date Of Birth is invalid.</p>";
	}

	if(document.querySelector("#emp_email").value.length<1)errorMessage+="<p>Employee Email is required.</p>";
	else{
		if((!document.querySelector("#emp_email").value.match(/^[^@]+@grapes.com)$/))||document.querySelector("#emp_email").value.match(/'/))errorMessage+="<p>Invalid Employee Email Id expression or character ' used.</p>";
	}

	if(document.querySelector("#emp_number").value.length<1)errorMessage+="<p>Employee Mobile Number is required.</p>";
	else{var num=document.querySelector("#emp_number").value.length;
		if(num<10 || num>14)errorMessage+="<p>Invalid Employee Mobile Number</p>";
	}

	if(document.querySelector("#emp_address").value.length<1)errorMessage+="<p>Employee Address is required.</p>";
	if(document.querySelector("#emp_address").value.match(/'/))errorMessage+="<p>Employee Address has invalid character '.</p>";

	if(document.querySelector("#emp_dept").value=="Choose Department")errorMessage+="<p>Employee Department is required.</p>";




	
	if(errorMessage!==original){
		e.preventDefault();
		document.querySelector("#error-box").innerHTML=errorMessage;
		document.querySelector("#error-box").style.display="block";
		document.documentElement.scrollTop= 0;
	}
	else{
		if(!confirm("Join the Grapes community?"))e.preventDefault();
	}
}