/**
* Create a background slideshow 
*/
function bgslider(imgList, options, css) {
	
	//Merge user options with default options
	options = Object.assign({
		TransitionDelay : 2000, 
		SlideDelay 		: 5000,
		appendTo 		: 'body',
		className		: 'bgslider'
	}, options);
	
	//Merge user CSS with default CSS that will apply to img tags
	css = Object.assign({
		width : '100vw',
		height : '100vh',
		top : 0,
		left: 0,
		position: 'fixed',
		zIndex: -10000,
		backgroundSize: 'cover',
		backgroundPosition: 'center center'
	}, css );
	
	//Pointer that will be use to walk through imageList
	var pointer = 0;
	
	//Create first of two IMG tags that will be used to make fade transition
	var tag1 = document.createElement('DIV');
	
	//Add className to img tag
	tag1.classList.add(options.className);
	
	//Apply CSS to img tag
	Object.assign(tag1.style, css);
	tag1.style.transition = 'opacity '+ options.TransitionDelay/1000 + 's';
	
	//Second img tag is a clone of the 1st
	tag2 = tag1.cloneNode();
	
	
	function showNext() {
		//initialisation of the pointer the first time the function is called
		if (pointer == undefined)
			pointer = 0;
		
		//if last image is reach, set pointer to first
		if (pointer >= imgList.length)
			pointer = 0;
		
		//Show next image
		tag1.style.backgroundImage = 'url('+imgList[pointer]+')';
		tag1.style.opacity=1;
		tag2.style.opacity=0;
		
		//Swap e1 and e2 DOM reference
		tag2 = [tag1, tag1 = tag2][0];
		
		//increment pointer to show next image next time
		pointer++;
	}
	

	function start() {
		//Insert img tags in DOM
		var elem = document.querySelector(options.appendTo);
		elem.insertBefore(tag1, elem.firstChild);
		elem.insertBefore(tag2, elem.firstChild);
		elem = undefined; delete(elem);
		
		//Start slideshow with interval
		showNext();
		window.setInterval(function(){showNext();}, options.SlideDelay);
	}
	
	
	// in case the document is already rendered
	if (document.readyState!='loading') start();
	// otherwise, wait for document to be ready
	else if (document.addEventListener) document.addEventListener('DOMContentLoaded', start);
	// IE <= 8
	else document.attachEvent('onreadystatechange', function(){
		if (document.readyState=='complete') start();
	});
	
}