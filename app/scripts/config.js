'use strict';
var app = app || {};
/**
 * most importat classes names that set the nav interaction, you can chanege these class names
 * but you should chage these in the markup also
 * @param  {Object} app
 * @return {Object}
 */
app = (function(app) {
  app.config = {
    navClass: 'nav_sections',
    isExpanded: 'is-expanded',
    mask: 'mask',
    nav: 'nav',
    header: 'header',
    subLevel: 'has--sublevel',
    toggleSlide: 'hamburger',
    main: 'main'
  };
  return app;
}(app));
