let mask = { width: '100%', height: '100%' };
$.mask = function () {
  let remove = true;
  if (arguments.length > 0) {
    remove = arguments[0];
  }

  if (remove) {
    if ($('.global-mask').size() > 0) return;
    $('<div class="global-mask">' +
        '<div class="mask-inner">' +
        '<div>' +
        '<span class="loadingImg"></span>' +
        '<span class="loadingText">数据加载中...</span>' +
        '<div style="clear:both;"></div>' +
        '</div>' +
        '</div>' +
        '</div>').css(mask).appendTo($('body'));
    $(window).resize(function() {
      $('.global-mask').css(mask);
    });
  } else {
    $('.global-mask').remove();
  }
};
