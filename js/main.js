var _countryIDSelect = -1;

/*========================================
Video Page
=========================================*/

//----------------------------------------
function onVideoBtn()
{
	$("#topVideo").fadeOut(1000);

	resetCountryPage();
	$("#map").show();
}

/*========================================
Country Page
=========================================*/
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
}

/*========================================
User Data
=========================================*/
//----------------------------------------
function onUserDataBtn()
{
	$("#userData").fadeOut(1000);
	$("#info").show();
}
/*========================================
Global 
=========================================*/
function init()
{	
	$("#topVideo").hide();
	$("#map").hide();
	//$("#userData").hide();
	$("#info").hide();
}

//----------------------------------------
window.onload
{
	//Mobile Check
	var client = new ClientJS();
	if(client.isMobile())
	{
		window.location = "m.html";
	}
	init();

}
	