
/*========================================
Top Page
=========================================*/
function resetTopPage()
{

}

//----------------------------------------
function onTopBtn()
{
	$("#top").fadeOut(1000);
	$("#videoPlay")[0].pause();
	resetCountryPage();
	$("#country").show();
}

/*========================================
Country Page
=========================================*/
function resetCountryPage()
{

}

//----------------------------------------
function onCountryBtn()
{
	$("#country").fadeOut(1000);
	resetUserDataPage();
	$("#info").show();
}


/*========================================
User Data
=========================================*/
var _checkClick;
function resetUserDataPage()
{
	$("#btnUserDataNext").attr("disabled", true);
	$("#userName").val("");
	$("#userPhone").val("");
	$("#userPhoneCheck").val("");
	_checkClick = false;
}
//----------------------------------------
function onUserDataBtn()
{
	$("#userData").fadeOut(1000);
	$("#info").show();
}


//----------------------------------------
function onPhone(phone)
{
	var phone = document.getElementById(phone.id);
	var check = document.getElementById("userPhoneCheck");
	if(phone.checkValidity())
	{		
		check.pattern = phone.value;
	}
	else
	{
		check.pattern = "";
	}
	dataCheck();
}

//----------------------------------------
function troggleUserDatabox(checkbox)
{
	_checkClick = checkbox.checked;
	dataCheck();
}

//----------------------------------------
function dataCheck()
{
	if(_checkClick && $("#userName")[0].checkValidity() && $("#userPhone")[0].checkValidity() && $("#userPhoneCheck")[0].checkValidity())
	{
		$("#btnUserDataNext").attr("disabled", false);
	}
	else
	{
		$("#btnUserDataNext").attr("disabled", true);
	}
}
/*========================================
Global 
=========================================*/
function init()
{	
	$("#top").hide();
	$("#country").hide();
	$("#userData").hide();
	//$("#info").hide();

	resetTopPage();
	resetCountryPage();
	resetUserDataPage();
}

//----------------------------------------
window.onload
{
	// //Mobile Check
	// var client = new ClientJS();
	// if(!client.isMobile())
	// {
	// 	window.location = "../index.html";
	// }
	$("select").fixForSafariMobile();
	init();

}