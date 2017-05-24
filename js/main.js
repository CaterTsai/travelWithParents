

/*========================================
Video Page
=========================================*/
var _audioOn = true;

//----------------------------------------
function resetVideoPage()
{
	_audioOn = true;
}

//----------------------------------------
function onVideoBtn()
{
	$("#topVideo").fadeOut(1000);
	$("#videoPlay")[0].pause();
	resetCountryPage();
	$("#map").show();
}

//----------------------------------------
function onAudioBtn()
{
	_audioOn = !_audioOn;
	if(_audioOn)
	{
		$("#btnAudio").attr('src', 'assets/audioOn.png');
		$("#videoPlay").prop("muted", false);
	}
	else
	{
		$("#btnAudio").attr('src', 'assets/audioOff.png');
		$("#videoPlay").prop("muted", true);
	}
}

/*========================================
Country Page
=========================================*/
var _countryIDSelect = -1;

//----------------------------------------
function resetCountryPage()
{
	_countryIDSelect = -1;
	$("#photoDisplay").hide();
}

//----------------------------------------
function onCountryBtn(country)
{
	if(_countryIDSelect != -1)
	{
		$("#" + _countryIDSelect).removeClass("speechHover");
	}
	_countryIDSelect = country.id;
}

//----------------------------------------
function onCountryMouseover(country)
{
	$("#" + country.id).addClass("speechHover");

	var position = $("#" + country.id).position();
	var halfsize = $("#photoDisplay").width() * 0.5;
	$("#photoDisplay").css({
		top:(position.top + halfsize)
		,left:(position.left + halfsize)
	});
	$("#photoDisplay").fadeIn(200);
}

//----------------------------------------
function onCountryMouseout(country)
{
	if(_countryIDSelect != country.id)
	{
		$("#" + country.id).removeClass("speechHover");
		
	}
	$("#photoDisplay").hide();		
}

//----------------------------------------
function onMapBtn()
{
	$("#map").fadeOut(1000);
	$("#userData").show();
	resetUserDataPage();
}

/*========================================
User Data Page
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
function onConfirmCheck(confirm)
{
	// if($("#userPhone").val() != $("#" + confirm.id).val())
	// {
		
	// }
	// else
	// {
	// 	_phoneCheck = false;
	// }
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
	//$("#topVideo").hide();
	$("#map").hide();
	$("#userData").hide();
	$("#info").hide();

	resetVideoPage();
	resetCountryPage();
	resetUserDataPage();
}

//----------------------------------------
window.onload
{
	//Mobile Check
	var client = new ClientJS();
	if(client.isMobile())
	{
		window.location = "m/index.html";
	}
	init();

}
	