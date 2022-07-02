var $menuElement = $('[data-name="Slide in"]');
var menuInstanceId = $menuElement.data('id');

if (menuInstanceId) {
  init();
}

function init() {
  var data = Fliplet.Widget.getData(menuInstanceId) || {};
  var lastScrollTop = 0;

  Fliplet.Hooks.on('addExitAppMenuLink', function() {
    var $exitButton = $([
      '<li class="linked with-icon" data-fl-exit-app>',
      '<div class="fl-menu-icon">',
      '<i class="fa fa-fw fa-sign-out"></i>',
      '</div>',
      '<i class="fa fa-angle-right linked-icon" aria-hidden="true"></i>',
      '<span class="internal-link buttonControl">' + T('widgets.menu.slideIn.actions.exit') + '</span>',
      '</li>'
    ].join(''));

    $exitButton.on('click', function onExitClick() {
      Fliplet.Navigate.exitApp();
    });

    $menuElement.find('ul').append($exitButton);

    // Prevent default "Exit" link from being added
    return Promise.reject();
  });

  if ($('li.with-icon').length) {
    $('.main-menu').addClass('with-icons');
  }

  if (Modernizr.backdropfilter) {
    $('.body').addClass('backdropfilter');
  }

  if (data.hide) {
    $(window).scroll(function() {
      var st = $(this).scrollTop();

      if (st > lastScrollTop) {
        // downscroll code
        $('body').addClass('fl-top-menu-hidden');
      } else {
        // upscroll code
        $('body').removeClass('fl-top-menu-hidden');
      }

      lastScrollTop = st;
    });
  }

  $('.fl-menu-overlay').click(function() {
    $(this).closest('.fl-menu').removeClass('active');
    $('.fl-viewport-header .hamburger').removeClass('is-active');
    $('body').removeClass('has-slide-menu');
  });

  $('.fl-menu .fl-close-menu').on('click', function() {
    $(this).parents('.fl-menu').removeClass('active');
    $('body').removeClass('has-slide-menu');
  });

  $('[open-about-overlay]').on('click', function() {
    Fliplet.Navigate.to({
      action: 'about-overlay'
    });
  });

  $('[data-fl-toggle-menu]').on('click keydown', function(event) {
    if (event.type !== 'click' && event.which !== 32 && event.which !== 13) {
      return;
    }

    $('.fl-viewport-header .hamburger').toggleClass('is-active');
    $('body').toggleClass('has-slide-menu');

    if (event.type === 'keydown') {
      $('body').find('.fl-menu').toggleClass('active');
    }
  });
}

Fliplet().then(function() {
  $menuElement.translate();
});
