'use strict';

(function () {
  const scroll = function () {
    const container = document.querySelectorAll('.js-scroll');
    container.forEach((item) => {
      const ps = new PerfectScrollbar(
          item,
          {
            wheelPropagation: false,
          }
      );
      ps.update();
    });
  };

  scroll();
})();

