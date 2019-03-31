// THIS CODE IMPLEMENTS A SET OF FUNCTIONS TO INJECT CSS PROPERTIES IN DOM WITH A JSON
// WITH A GIVEN SYNTAX

// Checks if a key represents a propertie, id, class or tag
function isPropertie ( key )
	{ return key.startsWith("-"); }

function isID ( key )
	{ return key.startsWith("#"); }

function isClass ( key )
	{ return key.startsWith("."); }

function isTag ( key )
	{ return ( !isPropertie(key) && !isID(key) && !isClass(key) ); }

// Return all children keys of an element.
function elementChildren ( element )
{
	// Array with element keys.
	let elementKeys = Object.keys( element );
	let childrenKeys = [];
	for( let i = 0; i < elementKeys.length; i++ )
	{
		if ( !isPropertie( elementKeys[i] ) )
			childrenKeys.push( elementKeys[i] );
	}
	return childrenKeys;
}


// Return an array with all properties keys of an object
function getProperties( element )
{
	// Array with element keys.
	let elementKeys = Object.keys( element );
	// Array with properties keys.
	let properties = [];
	for( let i = 0; i < elementKeys.length; i++ )
	{
		if ( isPropertie( elementKeys[i] ) )
		{
			properties.push( elementKeys[i] ); // remove the character '-'.
		}
	}
	return properties;
}



function injectCSS ( theme )
{

	loadThemeJSON( theme, ( themeSetup )=> {
		let keys = Object.keys( themeSetup );
		for( let i = 0; i < keys.length; i++ )
		{
			let elementKey = keys[i]; // element key.
			let elementProps = getProperties(themeSetup[ elementKey ]); // element properties.

			if (isTag( elementKey ))
				applyPropsTag( elementKey, themeSetup[elementKey], document );
			if (isClass( elementKey ))
				applyPropsClass( elementKey, themeSetup[elementKey], document )
			if (isID( elementKey ))
				applyPropsID( elementKey, themeSetup[elementKey], document )
		}
	});
}

function addHoverEffect ( element, properties )
{
	element.addEventListener( "mouseover", function(){

	});
	element.addEventListener( "mouseout", function(){
		
	});
}



// Apply a set of styles in elements with a given tag.
function applyPropsTag ( tagName, setup, parent )
{
	let build;

	// Checks elements parents
	build = parent.getElementsByTagName(tagName);

	for ( let elementIndex = 0; elementIndex < build.length; elementIndex++ )
	{
		let element = build[ elementIndex ];// actual element.
		let properties = getProperties(setup); // properties for the elements
		// Applies the properties in the elements.
		for ( let i = 0; i < properties.length; i++ )
		{
			if (properties[i].startsWith("-hover"))
				addHoverEffect( element, properties );
			else
				element.style[ properties[i].substr(1) ] = setup[properties[i]];
		}
			

			// Apply the properties for the children elements.
		let children = elementChildren(setup); // elements that are child of main element
		if ( children.length > 0 )
			children.forEach( ( child, index )=>{
				if ( isTag(child) ) // if the element child is a tag.
					applyPropsTag( children[index], setup[children[index]], element  );

				if ( isClass(child) )
					applyPropsClass( children[index], setup[children[index]], element  );

				if ( isID(child) )
					applyPropsID( children[index], setup[children[index]], element  );			
			});

		// for ( let i = 0; i < children.length; i++ ) // for each children
		// {
		// 	let child;
		// 	// If child is a tag
		// 	if ( isTag(children[i]) )
		// 		child = element.getElementsByTagName(children[i]); // all children tags
		// 	// If child is a class
		// 	if ( isClass(children[i]) )
		// 		child = element.getElementsByClassName(children[i].substr(1));
		// 	// If child is an id
		// 	if ( isID(children[i]) )
		// 	{
		// 		child = element.getElementById(children[i].substr(1)); // a children id
		// 		let subSetup = setup[children[i]]; // Child values
		// 		let subConfig = getProperties(subSetup);// Child props
		// 		// Applies the properties in the children.
		// 		for ( let i = 0; i < subConfig.length; i++ )
		// 			child.style[ subConfig[i].substr(1) ] = subSetup[subConfig[i]];
		// 		break;
		// 	}
			
		// 	for ( let childIndex = 0; childIndex < child.length; childIndex++ )
		// 	{
		// 		let subSetup = setup[children[i]]; // Child values
		// 		let subConfig = getProperties(subSetup); // Child props
		// 		// Applies the properties in the children.
		// 		for ( let i = 0; i < subConfig.length; i++ )
		// 			child[childIndex].style[ subConfig[i].substr(1) ] = subSetup[subConfig[i]];
		// 	}
		// }
	}
}


function applyPropsClass ( className, setup )
{

	let build = document.getElementsByClassName(className.substr(1));
	for ( let elementIndex = 0; elementIndex < build.length; elementIndex++ )
	{
		let element = build[ elementIndex ];// actual element.
		let properties = getProperties(setup); // properties for the elements
		// Applies the properties in the elements.
		for ( let i = 0; i < properties.length; i++ )
			element.style[ properties[i].substr(1) ] = setup[properties[i]];	

		// Apply the properties for the children elements.
		let children = elementChildren(setup); // elements that are child of main element
		if ( children.length > 0 )
			children.forEach( ( child, index )=>{
				if ( isTag(child) ) // if the element child is a tag.
					applyPropsTag( children[index], setup[children[index]], element  );

				if ( isClass(child) )
					applyPropsClass( children[index], setup[children[index]], element  );

				if ( isID(child) )
					applyPropsID( children[index], setup[children[index]], element  );			
			});
	}
}

function applyPropsID ( id, setup )
{
	let build = document.getElementById(id.substr(1));

	let properties = getProperties(setup); // properties for the elements
	// Applies the properties in the elements.
	for ( let i = 0; i < properties.length; i++ )
		build.style[ properties[i].substr(1) ] = setup[properties[i]];	

	
	let children = elementChildren(setup); // elements that are child of main element


	// Apply the properties for the children elements.
	if ( children.length > 0 )
		children.forEach( ( child, index )=>{
			if ( isTag(child) ) // if the element child is a tag.
				applyPropsTag( children[index], setup[children[index]], element  );

			if ( isClass(child) )
				applyPropsClass( children[index], setup[children[index]], element  );

			if ( isID(child) )
				applyPropsID( children[index], setup[children[index]], element  );			
		});
}




	// //CHANGE THE {TAGS ELEMENTS} OF THEME OBJECT.
	// themeObject.tags.forEach( ( tag ) => {
	// 	let build = document.getElementsByTagName(tag); // Get elements with the tag.
	// 	// An array with the element setup.
	// 	let elementThemeValues = configFile[tag];
	// 	// An array with the key name of each propertie to be changed.
	// 	let elementThemeProperties = Object.keys( elementThemeValues );
	// 	// Applies the properties in any element with the tag.
	// 	for( let buildIndex = 0; buildIndex < build.length; buildIndex++  )
	// 	 {
	// 		// Applies the properties in each unique element.
	// 		for( let i = 0; i < elementThemeProperties.length; i++  )
	// 		{
	// 			let prop = elementThemeProperties[i]; // Get the propertie [i] to be applied.
	// 			// Applie the config value at the element style.
	// 			build[buildIndex].style[ prop ] = elementThemeValues[prop];
	// 		} // End for 2
	// 	} // End for 1
	// }); // End forEach

		// // CHANGE THE {CLASSES ELEMENTS} OF THE THEME OBJECT.
		// themeObject.classes.forEach( ( themeClass ) => {
		// 	let _themeClass = themeClass.substr(1); // Remove the '.' from the class name.
		// 	let build = document.getElementsByClassName(_themeClass); // Get elements with the class name.
		// 	// An array with the element setup.
		// 	let elementThemeValues = configFile[themeClass];
		// 	// An array with the key name of each propertie to be changed.
		// 	let elementThemeProperties = Object.keys( elementThemeValues );
		// 	// Applies the properties in any element with the tag.
		// 	for( let buildIndex = 0; buildIndex < build.length; buildIndex++  )
		// 	 {
		// 		// Applies the properties in each unique element.
		// 		for( let i = 0; i < elementThemeProperties.length; i++  )
		// 		{
		// 			let prop = elementThemeProperties[i]; // Get the propertie [i] to be applied.
		// 			// Applie the config value at the element style.
		// 			build[buildIndex].style[ prop ] = elementThemeValues[prop];
					
		// 		} // End for 2
		// 	} // End for 1
		// }); // End forEach

		// // CHANGE THE {IDS ELEMENTS} PROPERTIES OF THE THEME OBJECT.
		// themeObject.ids.forEach( ( themeID ) => {
		// 	let _themeID = themeID.substr(1); // Remove the '#' from the id key.
		// 	let build = document.getElementById(_themeID); // Get element with the id.
		// 	// An array with the element setup.
		// 	let elementThemeValues = configFile[themeID];
		// 	// An array with the key name of each propertie to be changed.
		// 	let elementThemeProperties = Object.keys( elementThemeValues );
		// 	// Applies the properties in the element with the id.
		// 	for( let i = 0; i < elementThemeProperties.length; i++  )
		// 	{
		// 		let prop = elementThemeProperties[i]; // Get the propertie [i] to be applied.
		// 		// Apply the config value at the element style.
		// 		build.style[ prop ] = elementThemeValues[prop];
		// 	} // End for
		// }); // End forEach


injectCSS( "default" );