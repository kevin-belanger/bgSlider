/*
 * BgSlider by Kevin Bélanger
 * https://github.com/kevin-belanger/bgSlider
 * 
 * Create a slideshow in the background of the page
 * 
 * Usage example: bgSlider(['img1.jpg', 'img2.jpg', 'img3.jpg']);
 */
function bgslider(imgList, options, css) {
	
	//Default values for parameters
	imgList = imgList || [];
	options = options || {};
	css 	= css     || {};
	
	//Merge user options with default options
	options.TransitionDelay = options.TransitionDelay   || 3000, 
	options.SlideDelay 	= options.SlideDelay        || 6000,
	options.appendTo 	= options.appendTo          || 'body',
	options.className	= options.className         ||'bgslider'
	
	//Merge user CSS with default CSS that will apply to div tags
	css.width 		= css.width                 || '100vw',
	css.height		= css.height                || '100vh',
	css.top 		= css.top                   || 0,
	css.left		= css.left                  || 0,
	css.position            = css.position              || 'fixed',
	css.zIndex 		= css.zIndex                || -10000,
	css.backgroundSize 	= css.backgroundSize        || 'cover',
	css.backgroundPosition 	= css.backgroundPosition    || 'center center'
	
	//Create first of two DIV tags that will be used to make fade transition
	var div1 = document.createElement('DIV');
	
	//Add className to DIV tag
	div1.classList.add(options.className);
	
	//Apply CSS to DIV tag
	Object.keys(css).forEach(function(i){
		div1.style[i] = css[i];
	});
	div1.style.transition = 'opacity '+ options.TransitionDelay/1000 + 's';
	
	//Second DIV tag is a clone of the 1st
	var div2 = div1.cloneNode();
	
	var showNext = (function() {
		//initialize pointer the first time the function is called
		var pointer = 0;
		
		return function(){
			//if last image is reach, set pointer to first
			if (pointer >= imgList.length)
				pointer = 0;
			
			//Show next image
			div1.style.backgroundImage = 'url('+imgList[pointer]+')';
			div1.style.opacity=1;
			div2.style.opacity=0;
			
			//Swap e1 and e2 DOM reference
			div2 = [div1, div1 = div2][0];
			
			//increment pointer to show next image next time
			pointer++;
		};
	})();
	

	function start() {
		//Insert the 2 DIVs tags in DOM
		var elem = document.querySelector(options.appendTo);
		elem.insertBefore(div1, elem.firstChild);
		elem.insertBefore(div2, elem.firstChild);
		elem = undefined; delete(elem);
		
		//Start slideshow with interval
		showNext();
		window.setInterval(function(){showNext();}, options.SlideDelay);
	}
	
	
	// in case the document is already rendered
	if (document.readyState!='loading') start();
	// otherwise, wait for document to be ready
	else document.addEventListener('DOMContentLoaded', start);
	
}
