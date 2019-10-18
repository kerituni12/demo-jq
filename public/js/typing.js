//plugin typing effect for text by hieunv99
(function ($) {
  $.fn.typingEf = function (text, blogtxt) {

    function type(tg, i, cur, cb) {
      // console.log(i);

    var $text = text[i];
    var getText = tg.text();

      tg.text(getText + $text[cur]);

      if(i > 0 ) blogtxt.text('Thành Viên');
      else blogtxt.text('Đề Tài')
      
      if (cur < $text.length - 1) {

        

        setTimeout(function () {
          type(tg, i, cur + 1, cb);
        }, 70);

        return true;
      }
      cb();
    }

    function del(tg, cb) {

      var getText = tg.text();
      var length = getText.length;

      tg.text(getText.substr(0, length - 1));
      
      if (length > 1) {
        setTimeout(function () {
          del(tg, cb)
        }, 50);
        return true;
      }      
      cb();
    }

    // Loop 
    function loop(tg, i) {
      
      type(tg, i, 0, function () {

        // Pause before deleting string
        setTimeout(function () {         
          del(tg, function () {           
            loop(tg, (i + 1) % text.length)
          })
        }, 1000);
      })

    }    
    return this.each(function () {
      loop($(this), 0);
    });

  };

}(jQuery));