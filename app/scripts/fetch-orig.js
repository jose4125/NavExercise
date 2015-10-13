'use strict';

var app = app || {};

/**
 * Ajax method inside the app object, this method will be use in the navBar component
 * the config object should be set in the navBar initialization -> app.js
 * @param  {Object} app
 * @return {Object}
 */
app = (function(app) {
  app.fetch = function(config, callback) {
    var httpReq;

    if (config.hasOwnProperty('url') &&
      typeof config.url === 'string' &&
      config.hasOwnProperty('method') &&
      typeof config.method === 'string') {
    }else {
      var err = new ReferenceError('need url, parent and method keys or shoudl be strings');
      throw err;
    }

    if (window.XMLHttpRequest) {
      httpReq = new XMLHttpRequest();
    }else {
      httpReq = new ActiveXObject('Microsoft.XMLHTTP');
    }

    httpReq.onreadystatechange = function() {
      if (httpReq.readyState === XMLHttpRequest.DONE) {
        if (httpReq.readyState === 4 && httpReq.status === 200) {
          callback(httpReq.responseText);
        }else if (httpReq.status === 400) {
          console.log('error 400');
        }else {
          console.log('no 200 or 400');
        }
      }
    };
    httpReq.open(config.method, config.url, true);
    httpReq.send();
  };
  return app;
}(app));
