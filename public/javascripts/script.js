$(document).ready(function() {

var myIndex = 0;
carousel();

function carousel() {
    var x = $(".slide");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 5000);
}

//--------------------------------------------


var count = 0;
services();

function services() {
    var x = $('.serv')
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    count++;
    if (count > x.length) {count = 1}
    x[count-1].style.display = "block";
  setTimeout(services, 5000);
}

//--------------------------------------------

$('#bar_item1').on('click',function(){
 $('html,body').animate({
        scrollTop: $('.divider').offset().top
      },2000);
});


$(window).on('load',function() {
 $('html,body').animate({
        scrollTop: $('#one').offset().top
      },2000);
});

//--------------------------------------------




});
$('.continue').on('click', function(){
  alert('clicked');
  $('#covering').css({'top':'300px','margin-left':'16%'})
});

