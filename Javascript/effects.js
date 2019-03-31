var body;
var side_menu;
var main_img;
var side_menu_buttons = [];
var sub_menu_buttons = [];



window.addEventListener( "load", ( event ) => {
	body = document.body;
	side_menu = document.getElementsByClassName("side-menu")[0];
	main_img = document.getElementsByClassName("main-img")[0];
	getMenuButtons();

	main_img.addEventListener( "load", function(){
		// console.log("image changing");
	});
});




// FADE OUT EFFECT
var fadeOutElements;
window.addEventListener( "click", ( event ) =>{
	// Get the elements with fadeOut class.
	if ( event.target.classList.contains("fadeOut") )
		fadeOut( event.target );
});

function fadeOut( target )
{
	let animationTime = 2;
	// Set the animation fadeOut to the element.
	target.style.animation = "fadeOut "+animationTime+"s linear";
	// Makes the element display none when the animation ends.
	setInterval(function(){
			target.style.display = "none";	
	}, ((animationTime*1000)-100) );
	
}







// CHANGE THE PAGE THEME.
window.addEventListener( "click", function( event )
{
	if (event.target.classList[0] == undefined ) return;
	// Get the elements with theme changer class.
	if ( event.target.classList[0].includes("-theme") )
		// Get the first class of the target 
		changeTheme( 
			// call the function changeTheme with the theme name that is before -.
			event.target.classList[0].substr(0, event.target.classList[0].indexOf('-')) 
		); 
});


function changeTheme( theme_name )
{
	loadThemeJSON( theme_name, ( configFile )=> {
		// Gets the body configuration from the JSON
		let bodySetup = configFile.body;
		let sideMenuSetup = configFile.sideMenu;
		let menuButtonsSetup = sideMenuSetup.button;
		let subMenuButtonsSetup = sideMenuSetup.subMenu.button;
		let mainImageSetup = configFile.mainImg;
		
		// == Setup body
		if ( bodySetup != undefined )
		{
			// Set body background
			body.style.background = bodySetup.backgroundColor;
		}
		
		// == Setup side menu
		if ( sideMenuSetup ) 
		{
			// Set side menu margin top
			if (sideMenuSetup.marginTop != undefined)
				side_menu.style.marginTop = sideMenuSetup.marginTop;
			// Set side menu margin left
			if (sideMenuSetup.marginLeft != undefined)
				side_menu.style.marginLeft = sideMenuSetup.marginLeft;
		}
		

		// == Setup main img
		if ( mainImageSetup != undefined ) 
		{
			// Set image src
			if (mainImageSetup.src != undefined)
				main_img.src = mainImageSetup.src;
			// Set image width
			if (mainImageSetup.width != undefined)
				main_img.style.width = mainImageSetup.width;
			// Set image top position
			if (mainImageSetup.top != undefined) 
				main_img.style.top = mainImageSetup.top;
			// Set image left position
			if (mainImageSetup.left != undefined) 
				main_img.style.left = mainImageSetup.left;
		}

		// == == Setup side menu buttons
		side_menu_buttons.forEach( ( element ) =>{ // For each button
			// Set the menu buttons font size
			if ( menuButtonsSetup.fontSize != undefined ) 
				element.style.fontSize = menuButtonsSetup.fontSize;
			// Add the default colors
			element.style.color = menuButtonsSetup.color;
			element.style.background = menuButtonsSetup.backgroundColor;
			// On mouse over active hover effects.
			element.addEventListener( "mouseover", ()=> {
				element.style.color = menuButtonsSetup.hoverColor;
				element.style.background = menuButtonsSetup.hoverBackgroundColor;
			});
			// On mouse out back to default.
			element.addEventListener( "mouseout", ()=> {
				element.style.color = menuButtonsSetup.color;
				element.style.background = menuButtonsSetup.backgroundColor;
			});
		});
		// == == Setup sub menu buttons
		sub_menu_buttons.forEach( ( element ) =>{ // For each button
			// Add the default colors
			element.style.color = subMenuButtonsSetup.color;
			element.style.background = subMenuButtonsSetup.backgroundColor;
			//On mouse over active hover effects.
			element.addEventListener( "mouseover", ()=> {
				element.style.color = subMenuButtonsSetup.hoverColor;
				element.style.background = subMenuButtonsSetup.hoverBackgroundColor;
			});
			// On mouse out back to default.
			element.addEventListener( "mouseout", ()=> {
				element.style.color = subMenuButtonsSetup.color;
				element.style.background = subMenuButtonsSetup.backgroundColor;
			});
		});
	});// loadThemeJSON
}


// THIS FUNCTION GET EVERY "a" TAG IN SIDE-MENU-LIST
function getMenuButtons () 
{
	// Get side-list items
	let list_side_menu_buttons = document.getElementsByClassName('side-menu-list-item');
	let list_sub_menu_buttons = document.getElementsByClassName('side-menu-sub-list-item');

	// Get side-menu links 
	for( let i = 0; i < list_side_menu_buttons.length; i++ )
		side_menu_buttons.push(list_side_menu_buttons[i].getElementsByTagName("a")[0]);
	// Get sub-menu links 
	for( let i = 0; i < list_sub_menu_buttons.length; i++ )
		sub_menu_buttons.push(list_sub_menu_buttons[i].getElementsByTagName("a")[0]);
}