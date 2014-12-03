'use strict';


// Functional JSON portfolio shenanigans
// Turned off now for speed reasons until preloader / lazy-loading solution determined
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
