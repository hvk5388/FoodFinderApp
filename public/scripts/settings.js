
/* Set dark mode class and store value */

$(document).ready(function($) {
    var dark = localStorage.getItem('dark');
    if (dark) 
  	    $('header').addClass(dark);
        $(".darkmode").click(function() {
        $("header").addClass("darkClass");
        localStorage.setItem('dark', 'darkClass');
    });

    $(".normalmode").click(function() {
    $("header").removeClass("darkClass");
    localStorage.setItem('dark', null);
    });
});