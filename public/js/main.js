$(document).ready(function() {

  //  General functionality 
  $(".projects-btn").on("click", function() {
    $(".sec-A").addClass("show-left");
    $(".head").hide();
  });

  $(".down").on("click", function() {
    $(".head").addClass("head-hide");
  });

  $(".home").on("click", function() {
    $(".left").removeClass("show-left");
    $(".sec-B").removeClass("show-bottom");
  });

  $(".about-btn").on("click", function() {
    $(".sec-B").addClass("show-bottom");
    entrance();
    setTimeout(function() {
      showBlocks(timelineBlocks, offset);
    }, 500);
  });

  // Landing typer 
  var typed = new Typed('.element', {
    strings: [" Empowering^1500", " Art^1500", " Freedom^1500", " A Headache^1500", " Life^1500", " Dope^1500"],
    typeSpeed: 100
  });
  

  // Projects 
  // open project
  $('.cd-single-project').on('click', function() {
    var selectedProject = $(this),
      toggle = !selectedProject.hasClass('is-full-width');
    if (toggle) toggleProject($(this), $('.projects-container'), toggle);
  });

  // close project
  $('.projects-container .cd-close').on('click', function() {
    toggleProject($('.is-full-width'), $('.projects-container'), false);
  });

  $('.home').on('click', function(){
    toggleProject($('.is-full-width'), $('.projects-container'), false);
  });


  // scroll to project info
  $('.projects-container .cd-scroll').on('click', function() {
    $('.projects-container').animate({
      'scrollTop': $(window).height()
    }, 500);
  });

  // Update Title and .cd-scroll Opacity While Scrolling 
  $('.projects-container').on('scroll', function() {
    window.requestAnimationFrame(changeOpacity);
  });

  function toggleProject(project, container, bool) {
    if (bool) {
      // expand project
      container.addClass('project-is-open');
      project.addClass('is-full-width').siblings('li').removeClass('is-loaded');
    } else {
      // check media query
      var mq = window.getComputedStyle(document.querySelector('.projects-container'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, ""),
        delay = (mq == 'mobile') ? 100 : 0;

      container.removeClass('project-is-open');
      // fade out project
      project.animate({
        opacity: 0
      }, 800, function() {
        project.removeClass('is-loaded');
        $('.projects-container').find('.cd-scroll').attr('style', '');
        setTimeout(function() {
          project.attr('style', '').removeClass('is-full-width').find('.cd-title').attr('style', '');
        }, delay);
        setTimeout(function() {
          showCaption($('.projects-container li').eq(0));
        }, 300);
      });
    }
  }

  function changeOpacity() {
    var newOpacity = 1 - ($('.projects-container').scrollTop()) / 300;
    $('.projects-container .cd-scroll').css('opacity', newOpacity);
    $('.is-full-width .cd-title').css('opacity', newOpacity);
    $('.is-full-width').hide().show(0);
  }

  function showCaption(project) {
    if (project.length > 0) {
      setTimeout(function() {
        project.addClass('is-loaded');
        showCaption(project.next());
      }, 150);
    }
  }

  //  Fade-In code from About Me Section 
  var timelineBlocks = $('.cd-timeline-block'),
    offset = .8;

  // hide timeline blocks which are outside the viewport
  hideBlocks(timelineBlocks, offset);

  // on scolling, show/animate timeline blocks when enter the viewport
  $('.under').on('scroll', function() {
    (!window.requestAnimationFrame) ? setTimeout(function() {
      showBlocks(timelineBlocks, offset);
    }, 100): window.requestAnimationFrame(function() {
      showBlocks(timelineBlocks, offset);
    });
  });

  function hideBlocks(blocks, offset) {
    blocks.each(function() {
      ($(this).offset().top > $('.under').scrollTop() + $(window).height() * offset) &&
      $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    });
  }

  function showBlocks(blocks, offset) {
    blocks.each(function() {
      ($(this).offset().top <= $('.under').scrollTop() + $(window).height() * offset &&
        $(this).find('.cd-timeline-img').hasClass('is-hidden')) &&
      $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    });
  }

  // bar graph
  var wrapper = $('.skills');
  var bar  = $('.stats__item-bar');
  var icons = $('.stats__item-icon');
  var overlay = $('.stats__overlay');
  var back = $('.stats__overlay-back');
  var isOpen = false;

  var vInfo = $('#info');
  var vScore = $('#score');

  bar.on('click', showOverlay);
  back.on('click', showOverlay);

  function entrance() {
    bar.addClass('active');
    wrapper.addClass('active');
    wrapper.on('transitionend webkitTransitionend', function() {
      icons.css('opacity', '1');
      bar.css('transition-delay', '0');
      wrapper.off('transitionend webkitTransitionend');
    });
  }

  function showOverlay() {
    if (!isOpen) {
      overlay.addClass('active').removeAttr('style');
      bar.css('transition', 'all 0.4s cubic-bezier(0.86, 0, 0.07, 1)')
      .removeClass('active');
      wrapper.removeClass('active');
      icons.css('opacity', '0');
      isOpen = true;
      
    updateInfo($(this).parent().index());
    } else {
      overlay.css('transition', 'all 0.4s cubic-bezier(0.755, 0.05, 0.855, 0.06)').removeClass('active');
      bar.addClass('active').removeAttr('style');
      wrapper.addClass('active');
      icons.css('opacity', '1');
      isOpen = false;
    }
  }

  var data = [
    {
      info: "Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you.",
      score: '100'
    },
    {
      info: '2008-2009',
      score: '90'      
    },
    {
      info: '2009-2010',
      score: '60'
    },
    {
      info: '2010-2011',
      score: '80'
    },
    {
      info: '2011-2012',
      score: '70'
    },
    {
      info: '2012-2013',
      score: '32'
    }
  ];
  
  function updateInfo(index) {
    vInfo.text(data[index].info);
    vScore.text(data[index].score);
  }
});
