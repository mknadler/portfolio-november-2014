'use strict';

// Welcome to my in-progress javascript! it's a work in progress.

// Functional JSON portfolio stuff
// Turned off now for speed reasons until preloader / lazy-loading solution determined
// I either need a better webhost or am missing some reason why this is taking so long to load
/*
$(function() {
$.getJSON('scripts/sites.json', function(sites) {
    var output = '';
    var test = 'outer';
    $.each(sites, function(){
      output += '<div class="project project-'+this.tag+'"><span>'+this.name+'</span><p>'+this.type+'. <br/>'+this.desc+'</p><a href="'+this.url+'">View site</a></div>';
    });
    $('.projects').append(output);
  });
});
*/

$(function(){
	// this is kind of a mess and I need to clean it (Module for the ghost blocks?)
	// first i want to see if these ideas work
	var title = $('#header-actual'),
		ghostLines,
		newText = '',
		// spanifyTextNode is for the jumping effect on the header>h1;
		// it just wraps each character in a <span>
		spanifyTextNode = function(text){
			// why 'text.text()? better variable name in the future.'
			var textArray = text.text().split('');
			text.html('');
			for (var i = 0, max = textArray.length; i < max; i++){
				newText += '<span>'+textArray[i]+'</span>';
			}
			text.html(newText);
		},
		ghostBlocks = function(thingToGhost, ghostContainer){
			// these values are hard-coded which is bad; if i change the font sizes,
			// this will cease to work. need to figure out dynamic solution.
			var lineHeight,
				isMobile,
				numLines,
				fragment='';

			// Determine number
			// or, y'know, i could actually just do a media query.
			isMobile = thingToGhost.height() < 70 ? 1 : 0;
			lineHeight = isMobile ? 17 : 23;
			numLines = (function(){
				return thingToGhost.height() / lineHeight;
			}());

			// short-circuit to prevent unnecessary DOM lookups/manipulations
			if (ghostLines === numLines) { return; }
			for (var i = 0, max = numLines; i < max; i++){
				// to prevent unecessary dom stuff
				fragment+='<span id="ghost-'+(i + 1)+'"></span>';
			}
			ghostContainer.html(fragment);
			// set killswitch
			ghostLines = numLines;
		},
		randomizeBlocks;

	randomizeBlocks = function(){
		var	numToChange = Math.floor(Math.random() * ghostLines + 1),
			numCurrentBars = (ghostLines),
			barsToPullFrom = [],
			barsToChange = [];

		(function(){
			// Set up list of bars
			console.log("Change this many: " + numToChange);
			for (var i = 0, max = numCurrentBars; i < max; i++){
				barsToPullFrom.push(i);
			}
			console.log("bars to pull from: " + barsToPullFrom);
			// don't look at this i'm "failing forward"
			for (var j = 0; j < numToChange; j++){
				console.log(" ");
				console.log("Pass # " + [j]);
				console.log("length: " + barsToPullFrom.length);
				var grabThis = Math.floor(Math.random() * (barsToPullFrom.length));
				console.log("")
				console.log("Try to pull this one: " + grabThis);
				console.log("barsToPullFrom before: " + barsToPullFrom);
				var index = barsToPullFrom.indexOf(grabThis);
				console.log("the index of the item to grab: " + index);
				barsToChange.push(barsToPullFrom[grabThis]);
				barsToPullFrom.splice(barsToPullFrom[grabThis], 1);
				console.log("barsToPullFrom after: " + barsToPullFrom);
				console.log(" ");
			}
			console.log("bars to change: " + barsToChange);
		}());
	};

	//call 'em
	spanifyTextNode(title);
	ghostBlocks($('.intro p'), $('#ghost'));
	randomizeBlocks();
	$(window).resize(function(){
		ghostBlocks($('.intro p'), $('#ghost'));
		randomizeBlocks();
	});
	setInterval(function(){ 
		//randomizeBlocks();
	}, 3000);

});