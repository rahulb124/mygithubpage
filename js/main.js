/*
*
* Created : Will Strimling
* Desctipition : .js controling
* Date : 2013 May
*
*/

var view = view || {};


view = {
  init : function() {
    view.resizer.init();
    if(view.width > 540) {
      $('.idea').tipsy({title: 'data-text', gravity: $.fn.tipsy.autoNS, opacity: 0.9});
    }
  },
  resizer : {
    init : function(){
      view.resizer.refreshSize();
    },
    refreshSize : function(){
        view.height = document.documentElement.clientHeight;
        view.width = document.documentElement.clientWidth;
      if(view.width > 720) {
        view.configure();
      }
      if(view.width < 540) {
        $("#v").html("Click on");
      }
    }
  },
  configure : function() {
    if( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ) {}
    else {
      if(view.width > 720) {
        screens = $(".screen");
        screens.each(function(index) {
          var $s = $(this);
          $s.height(view.height);
          $("body").width(view.width);

          var $content = $s.children('.content');
          $content.css('padding-top', ($s.height()-$content.height())*0.5);
          $s.attr('data-top',index*view.height);
        });
      }
    }
  }
}

data = {
  quotes: [
    '"WILL is character in action." - William McDougall',
    '"Men can do all things if they WILL." - Leon Batista Alberti',
    '"You are only as lazy or lacking in WILL as you think you are." - Ken Christian',
    '“It is fatal to enter any war without the WILL to win it.” – Douglas Macarthur',
    '“People do not lack strength; they lack WILL.” – Victor Hugo',
    '“Where there is WILL, there is way” – English Proverb',
    'Strength does not come from physical capacity. It comes from an indomitable WILL. – Mahatma Gandhi',
    '"WILL is to the mind like a strong blind man who carries on his shoulders a lame man who can see." - Arthur Schopenhauer',

  ]
}

$(".circle.i").hover(
  function () {
    var img = $(this).find('.image');
    img.attr("src", img.attr("src").replace(".png","_hover.png"));
  },
  function () {
    var img = $(this).find('.image');
    img.attr("src", img.attr("src").replace("_hover",""));
  }
);


$(".ticker").click(function(e){
  e.preventDefault();
  console.log($($(this).attr('href')).data('top'));
  $("#container").animate({ scrollTop: $($(this).attr('href')).data('top')}, 500);
  if(history.pushState) {
      history.pushState(null, null, $(this).attr('href'));
  }
  else {
      location.hash = $(this).attr('href');
  }
  console.log('click: '+ $(this).attr('href'));
});

$('#form').submit(function(e){
  var num = $.trim($('#number').val());
  var database = new Firebase('https://willstrimling.firebaseIO.com/');
  database.push({number: num}, function(){
    $('#number').val("");
    console.log("success!");
    $('#success').show();
  });
  e.preventDefault();
  return false;
});

$('.idea').click(function() {
  if( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    alert($(this).data('text'));
  }
});

/*
* Lets run this machine on document ready!
*/

$(document).ready(function(){
  view.init();
  console.log("load");
  // Trigger the event (useful on page load).

});

/*
* Page resize! we can start the page engine!
*/

$(window).resize(function(){
  view.resizer.init();
});

/*
* Page loaded! we can start the page engine!
*/

$(window).load(function(){
  console.log('all loaded!');
});
