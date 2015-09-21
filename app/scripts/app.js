'use strict';

var app = app || {};
document.addEventListener('DOMContentLoaded', function() {
  /**
   * configuration object to set the url and method to the ajax request,
   * set the parent node to the navbar and the tag element
   * @type {Object} {url: 'api url', : method: 'GET - POST', parent: 'tag class',: element: 'optional html tag, by default is ul'}
   */
  var config = {
    url: '/api/nav.json',
    method: 'GET',
    parent: 'nav'
  };
  /**
   * init the navBar
   */
  app.createNav(config);
});
