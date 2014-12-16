
$(function(){

	"use strict";
	
	// the variable names are literally a joke; if this were in production
	// for anything besides a personal portfolio, I'd name them something
	// more maintable. But, hey, it passes jshint.

	var title = $('#header-actual'),
		human = $('.intro p'),
		dybbuk = $('#ghost'),
		poltergeists,
		spanifyTextNode;

	// I only wrote this to check whether a single piece of data has changed,
	// but it would be nice to have it accomodate multiple pieces of data
	var changeCheck = (function(){
		var isSame, stored, input, registerTruth, print, hasItChanged;
		// store a value
		input = function(datum){
			stored = datum;
		};
		// store whether the values match
		registerTruth = function(datum){
			isSame = (datum === stored) ? true : false;
		};
		// log it (for debugging purposes)
		print = function(){
			console.log('stored state: '+stored);
			console.log('isSame: '+isSame);
		};
		// publicize whether the values do not match
		hasItChanged = function(){
			return !isSame;
		};
		return {
			input: input,
			check: registerTruth,
			print: print,
			stored: stored,
			hasItChanged: hasItChanged
		};
	})();

	var numLines = (function(){
		var source = human,
			sourceHeight, lineHeight, tempLines;
		// TODO : these are hard-coded values; not the best for maintenace; make dynamic.
		/* if the height of the P is less than 70, that means it's currently at the mobile breakpoint
		   & the height of the produced spans should be 17px; otherwise, 23px. */
		// It's also generating the wrong number at certain sizes (e.g. 903px, 
		// but only sometimes (why? I'm guessing rounding, or my math for the static vals are just off.)
		
		var makeHeights = function(){
			// determine what the height of each line is
			lineHeight = sourceHeight < 70 ? 17 : 23;
			sourceHeight = source.height();
		};
		var calculate = function(){
			// set the number of lines on the fly
			makeHeights();
			tempLines = sourceHeight / lineHeight;
		};
		var store = function(){
			// register the current number of lines with changeCheck
			changeCheck.input(tempLines);
		};
		var get = function(){
			// retrieve the number of lines, for public method
			return tempLines;
		};
		return {
			calculate: calculate,
			store: store,
			get: get
		};
	})();

	var scaryGhosts = (function(){
		var onlyOneGhostPerBodyPleaseWaitYourTurn, haunt, ectoplasm='';

		// check if the number of lines has changed
		onlyOneGhostPerBodyPleaseWaitYourTurn = function(){
			numLines.calculate();
			var temp = numLines.get();
			changeCheck.check(temp);
			if(changeCheck.hasItChanged()){
				haunt();
			}
		};

		// if the number of lines hasn't changed,
		// create a span for each of those lines and DOM 'em
		haunt = function(){
			numLines.calculate();
			var howManyVeryScaryGhosts = numLines.get();
			for (var i = 0, max = howManyVeryScaryGhosts; i < max; i++){
				ectoplasm+='<span id="ghost-'+(i)+'"></span>';
			}
			dybbuk.html(ectoplasm);
			numLines.store();
			ectoplasm = '';
		};

		return{
			boo: onlyOneGhostPerBodyPleaseWaitYourTurn,
			haunt: haunt
		};
	})();

	// for hover animations in header; wraps letters in spans
	spanifyTextNode = function(element){
		var newText = '', textArray = element.text().split('');
		element.html('');
		for (var i = 0, max = textArray.length; i < max; i++){
				newText += '<span>'+textArray[i]+'</span>';
			}
		element.html(newText);
		newText = null;
	};

	//  
	var buildBlocks = function(amount){
		var bars = [],
			numToChange = Math.floor(Math.random() * amount + 1),
			popped;
		
		// add a number to an array for each line of text
		for (var i = 0, max = amount; i < max; i++){
			bars.push(i);
		}
		// randomly sort that array
		shuffle(bars);
		// then remove each number from that array
		// and create a span suffixed with that number
		while (numToChange > 0){
			popped = bars.pop();
			$('span#ghost-'+popped).toggleClass('boo');
			numToChange-=1;
		}
	};

	function specialGlassesThatLetYouSeeGhosts(){
		// Checks if the generated spans are visible;
		// if not, makes them visible
		// Done this way to avoid static blob-ghosts if someone
		// doesn't have JS
		poltergeists = dybbuk.children();
		if(!(poltergeists.hasClass('visible'))) { 
			poltergeists.addClass('visible');
		}
	}

	// Fisher-Yates shuffle; the only thing in here not written by me
	function shuffle(array) {
  		var currentIndex = array.length, temporaryValue, randomIndex ;
  		while (0 !== currentIndex) {
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;
    		temporaryValue = array[currentIndex];
    		array[currentIndex] = array[randomIndex];
    		array[randomIndex] = temporaryValue;
  		}
  		return array;
	}	

// call 'em all!
	spanifyTextNode(title);
	specialGlassesThatLetYouSeeGhosts();
	scaryGhosts.boo();
	$(window).resize(function(){
		scaryGhosts.boo();
		specialGlassesThatLetYouSeeGhosts();
	});
	setInterval(function(){ 
		buildBlocks(numLines.get());
		scaryGhosts.boo();
	}, 3000);

	

}); // end wrapper