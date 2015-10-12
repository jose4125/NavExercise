'use strict';

var app = app || {};
var Q;

/**
 * Ajax method inside the app object, this method will be use in the navBar component
 * the config object should be set in the navBar initialization -> app.js
 * @param  {Object} app
 * @return {Object}
 */
app = (function(app) {
  app.fetch = function(config) {
    return Q.Promise(function(resolve, reject, notify) {
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

      function onLoad() {
        if (httpReq.readyState === XMLHttpRequest.DONE) {
          if (httpReq.readyState === 4 && httpReq.status === 200) {
            resolve(httpReq.responseText);
          }else if (httpReq.status === 400) {
            console.log('error 400');
            reject(new Error('error 400'));
          }else {
            console.log('no 200 or 400');
            reject(new Error('no 200 or 400'));
          }
        }
      }

      function onError() {
        reject(new Error('Can\'t XHR ' + JSON.stringify(config.url)));
      }

      function onProgress() {
        notify(event.loaded / event.total);
      }

      httpReq.open(config.method, config.url, true);
      httpReq.onload = onLoad;
      httpReq.onerror = onError;
      httpReq.onprogress = onProgress;
      httpReq.send();
    });
  };
  return app;
}(app));
