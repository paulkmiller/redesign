$(document).ready(function() {

  //  General functionality 
  $(".projects-btn").on("click", function() {
    $(".sec-A").addClass("show-left");
    $("#mburger").addClass("active");
    $(".head").hide();
  });

  $(".down").on("click", function() {
    $(".head").addClass("head-hide");
  });

  $(".home").on("click", function() {
    $(".left").removeClass("show-left");
    $(".sec-B").removeClass("show-bottom");
    $("#mburger").removeClass("active");
    overlay.css('transition', 'all 0.4s cubic-bezier(0.755, 0.05, 0.855, 0.06)').removeClass('active');
    bar.addClass('active').removeAttr('style');
    wrapper.addClass('active');
    icons.css('opacity', '1');
    isOpen = false;
  });

  $(".about-btn").on("click", function() {
    $(".sec-B").addClass("show-bottom");
    $("#mburger").addClass("active");
    entrance();
    setTimeout(function() {
      showBlocks(timelineBlocks, offset);
    }, 500);
  });

  // Landing typer 
  const typed = new Typed('.element', {
    strings: [" Empowering^1500", " Art^1500", " Freedom^1500", " A Headache^1500", " Life^1500"],
    typeSpeed: 100
  });
  

  // Projects 
  // open project
  $('.pm-single-project').on('click', function() {
    let selectedProject = $(this),
      toggle = !selectedProject.hasClass('is-full-width');
    if (toggle) toggleProject($(this), $('.projects-container'), toggle);
  });

  // close project
  $('.projects-container .pm-close').on('click', function() {
    toggleProject($('.is-full-width'), $('.projects-container'), false);
  });

  $('.home').on('click', function(){
    toggleProject($('.is-full-width'), $('.projects-container'), false);
  });


  // scroll to project info
  $('.projects-container .pm-scroll').on('click', function() {
    $('.projects-container').animate({
      'scrollTop': $(window).height()
    }, 500);
  });

  // Update Title and .pm-scroll Opacity While Scrolling 
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
      let mq = window.getComputedStyle(document.querySelector('.projects-container'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, ""),
        delay = (mq == 'mobile') ? 100 : 0;

      container.removeClass('project-is-open');
      // fade out project
      project.animate({
        opacity: 0
      }, 800, function() {
        project.removeClass('is-loaded');
        $('.projects-container').find('.pm-scroll').attr('style', '');
        setTimeout(function() {
          project.attr('style', '').removeClass('is-full-width').find('.pm-title').attr('style', '');
        }, delay);
        setTimeout(function() {
          showCaption($('.projects-container li').eq(0));
        }, 300);
      });
    }
  }

  function changeOpacity() {
    const newOpacity = 1 - ($('.projects-container').scrollTop()) / 300;
    $('.projects-container .pm-scroll').css('opacity', newOpacity);
    $('.is-full-width .pm-title').css('opacity', newOpacity);
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
  let timelineBlocks = $('.pm-timeline-block'),
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
      $(this).find('.pm-timeline-img, .pm-timeline-content').addClass('is-hidden');
    });
  }

  function showBlocks(blocks, offset) {
    blocks.each(function() {
      ($(this).offset().top <= $('.under').scrollTop() + $(window).height() * offset &&
        $(this).find('.pm-timeline-img').hasClass('is-hidden')) &&
      $(this).find('.pm-timeline-img, .pm-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    });
  }

  // bar graph
  let wrapper = $('.skills');
  let helper = $('.skills .stats .helper');
  let bar  = $('.stats__item-bar');
  let icons = $('.stats__item-icon');
  let overlay = $('.stats__overlay');
  let back = $('.stats__overlay-back');
  let isOpen = false;

  let vInfo = $('#info');
  let vScore = $('#score');

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
      helper.removeClass('helper');
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

  const data = [
    {
      info: "I am firmly grounded in semantic markup and the long-term effects this has on a project, be it with A11Y, or with another developer looking to make sense of everything.",
      score: '100'
    },
    {
      info: "I've always been one to aim to realize and extend a design using this robust and fantastic language, especially with SCSS. This was my gateway drug into web development.",
      score: '90'      
    },
    {
      info: "JavaScript is in an amazing place today. I love all the things available to frontend development by virtue of Node.js allowing server-side development with Javascript and frameworks like React / Vue having turned component design the norm, there's so much you can do now. Javascript is stupid, fun, frustrating, and incredible, all at the same time.",
      score: '70'
    },
    {
      info: "A major focus of mine over my career, especially as the air around failing WCAG conventions has become increasingly litigious. Accessibility is the moral responsibility of every developer and not simply a nicety.",
      score: '80'
    },
    {
      info: "With my work in Wordpress at Grafik, my exposure to PHP has increased. So much so, that I feel comfortable enough to list it here, instead of Ruby, my initial server-side language. I look forward to the opportunity to strengthen my understanding with more projects.",
      score: '60'
    },
    {
      info: "The ever-popular and versatile CMS, I will admit that I didn't care for it much until I discovered Advanced Custom Fields. Now coupled with the ease of themeing as WP evolved, it is one of my many favorite tools toward achieving a goal quickly.",
      score: '70'
    }
  ];
  
  function updateInfo(index) {
    vInfo.text(data[index].info);
    vScore.text(data[index].score);
  }
});
