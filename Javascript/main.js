function setCookie( cookieName, cookieData, cookieExpire ) 
{
	// Create a date object
	let d = new Date();
	// Set the expiration time of the cookie using the date object.
	d.setTime(d.getTime() + (cookieExpire*24*60*60*1000));
	// Makes a variable to set the cookie with the right syntax.
	let expires = "expires="+ d.toUTCString();
	// Create the cookie.
	document.cookie = cookieName + "=" + cookieData + ";" + expires + ";path=/";
	// If the cookie was sucesseful created returns true.
	if ( getCookie(cookieName) == cookieData ) return true;
	// Else
	return false;
}

function getCookie ( cookieName )
{
	// Temporary variable to recieve cookie name + '=' sign.
	let cName = cookieName + "=";
	// Decode cookies. ( That's important because it handle with special chars in cookie )
	let dCookie = decodeURIComponent( document.cookie );
	// Split cookie into parts to make an array with each of them.
	let splittedCookie = dCookie.split(';');
	// Checks each part of splitted cookie array.
	for(let i = 0; i < splittedCookie.length; i++) 
	{
		let part = splittedCookie[i];
		// Removes whitespaces.
		while (part.charAt(0) == ' ') {
			part = part.substring(1);
		}
		// If find the cookie then return the data.
		if ( part.indexOf(cName) == 0 ) 
			return part.substring(cName.length, part.length); // Data is after the name + '=' sign.
	}
	// Else 
	return '';
}

window.addEventListener( "load", function( event ){
	console.log("Made by: Pleshw");
	// Set a visited cookie for 7 days.
	setCookie( "Visited", "True", 7 );
});


// Load a json in a callback.
function loadThemeJSON( src, callback ) {   
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.overrideMimeType("application/json");
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == "200") {
		  callback( JSON.parse( this.responseText ) );
		}
	};
	xmlhttp.open('GET', 'http://localhost:80/'+src, true);
	xmlhttp.send();  
}