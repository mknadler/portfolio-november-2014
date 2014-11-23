'use strict';


// Typekit


$(function() {
  function place(){
    var actuals = {};
    actuals.header = $(".intro span");
    actuals.header.pos = actuals.header.position();
    actuals.header.top = actuals.header.pos.top;
    console.log(actuals.header.top);
    actuals.header.left = actuals.header.pos.left;
    actuals.header.width = actuals.header.width();
    actuals.header.height = actuals.header.height();
    actuals.container = $("header");
    actuals.container.width = actuals.container.width();
    $("#ghost").css({
      "width":actuals.header.width,
      "height":actuals.header.height,
      "background":"blue",
      "position":"absolute",
      "left": (actuals.container.width - actuals.header.width - actuals.header.left),
      "top": actuals.header.top
    });
  };
/*
place();
$(window).resize(function (){
  place();
});
*/
});
