/*global chai:false, sinon: false, describe:false, context:false, before:false, it:false, app:false */
'use strict';
var expect = chai.expect;

describe('Navbar', function() {
  var navBar;
  var config;
  before(function() {
    config = {
      url: '/api/nav.json',
      method: 'GET',
      parent: '.nav_sections'
    };
    navBar = app.createNav(config);
  });
  context('starting the app', function() {
    it('should app have the createNav method', function() {
      expect(app).to.have.property('createNav');
    });
    it('should createNav call once', function(done) {
      sinon.spy(app, 'createNav');
      app.createNav(config);
      expect(app.createNav.calledOnce).to.be.true;
      expect(app.createNav.args).to.have.length(1);
      expect(app.createNav.args[0][0]).to.be.an('Object');
      expect(app.createNav.args[0][0].url).to.be.a('String');
      expect(app.createNav.args[0][0].method).to.be.a('String');
      expect(app.createNav.args[0][0].parent).to.be.a('String');

      app.createNav.restore;

      done();
    });
    it('should app. createNav  return an object', function() {
      expect(navBar).to.be.an('Object');
    });
    it('should return an error if params are empty', function() {
      expect(function() {
        app.createNav({});
      }).to.throw(ReferenceError);
    });
    it('should return an error if  any params is not a string', function() {
      expect(function() {
        app.createNav({
          url: '/api/nav.json',
          method: 2,
          parent: '.nav_sections'
        });
      }).to.throw(ReferenceError);
    });
  });

  context('initialize the navBar', function() {
    it('navbar shoud have the fetch method', function() {
      expect(navBar).to.have.property('fetch');
    });
    it('fetch method shoud return an json object', function(done) {
      var data = '{"items":[{"label":"Work","url":"#/work","items":[]},{"label":"About","url":"#/about","items":[{"label":"What we do","url":"#/about/what-we-do"},{"label":"How we work","url":"#/about/how-we-work"},{"label":"Leadership","url":"#/about/leadership"}]}]}'
      this.xhr = sinon.useFakeXMLHttpRequest();
      var requests = this.requests = [];
      this.xhr.onCreate = function(xhr) {
        requests.push(xhr);
      };
      var callback = sinon.spy();
      app.fetch({
        url: '/api/nav.json',
        method: 'GET'
      }, callback);
      this.requests[0].respond(200, {'Content-Type': 'application/json'},
                    data);
      expect(this.requests).to.have.length(1);
      expect(this.requests[0].response).to.be.a('String');
      expect(callback.calledWith(data)).to.be.true;
      expect(JSON.parse(data)).to.include.keys('items');
      expect(JSON.parse(data).items).to.be.an('Array');

      this.xhr.restore();
      done();
    });
  });

});
