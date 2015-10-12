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

'use strict';
var app = app || {};
app = (function(app) {
  /**
   * Navbar class
   * @param {Object} config [description]
   */
  var Navbar = function(config) {
    Object.defineProperties(this, {
      url: {
        value: config.url
      },
      parent: {
        value: config.parent
      },
      element: {
        value: config.element || 'ul'
      }
    });

    this.fetch(config);
  };

  var element = {};

  var Button = function(buttonData) {
    Object.defineProperties(this, {
      url: {
        value: buttonData.url || ''
      },
      label: {
        value: buttonData.label || ''
      }
    });
  };

  Object.defineProperties(Button.prototype, {
    getFirstLevelHtml: {
      value: function(firstLevelItems) {
        var eventClass = (this.length) ? ' has--sublevel' : '';

        var hasSublevel = (this.length) ?
          '<span class="icon-expand_more show--mobile"></span>' : '';

        var aria = (this.length) ?
          'role="button" aria-haspopup="true" aria-expanded="false"' : '';

        var html = [
          '<li class="nav_items">',
          '<a href="' + this.url + '" class="nav_links' + eventClass + '"' +
          aria + ' target="_blank">' + this.label,
          hasSublevel,
          '</a>'
        ];

        if (this.length) {
          html.push(this.getSubLevelHtml(this.subLevel));
        }
        html.push('</li>');
        html = html.join('');
        return html;
      }
    },
    getSubLevelHtml: {
      value: function(subLevelItems) {
        var html = [
          '<ul class="nav_sublevel" role="list">'
        ];
        for (var subItems in subLevelItems) {
          // var navSubItems = subLevelItems[subItems];
          var navSubItems = new SubButton(subLevelItems[subItems]);
          html.push(navSubItems.getSubLevelListItm());
        }
        html.push('</ul>');
        html = html.join('');
        return html;
      }
    },
    getSubLevelListItm: {
      value: function() {
        return '<li class="nav_sublevel_items" role="listitem"><a href="' +
        this.url + '" class="nav_sublevel_links" target="_blank">' +
        this.label + '</a></li>';
      }
    }
  });

  var NavButton = function(buttonData) {
    Button.call(this, buttonData);
    Object.defineProperties(this, {
      length: {
        value: buttonData.items.length
      },
      subLevel: {
        value: buttonData.items
      }
    });
  };
  NavButton.prototype = Object.create(Button.prototype);

  var SubButton = function(buttonData) {
    Button.call(this, buttonData);
  };
  SubButton.prototype = Object.create(Button.prototype);

  /**
   * generate the sublevel item markup
   * @param  {Object}
   * @return {String}
   */
  var _getSubLevelListItm = function(item) {
    return '<li class="nav_sublevel_items" role="listitem"><a href="' + item.url + '" class="nav_sublevel_links" target="_blank">' + item.label + '</a></li>';
  };

  /**
   * get the sublevel list items and generate whole the sub list markup and return it
   * @param  {Object} subLevelItems
   * @return {String}
   */
  var _getSubLevelHtml = function(subLevelItems) {
    var html = [
      '<ul class="nav_sublevel" role="list">'
    ];
    for (var subItems in subLevelItems) {
      var navSubItems = subLevelItems[subItems];
      html.push(_getSubLevelListItm(navSubItems));
    }
    html.push('</ul>');
    html = html.join('');
    return html;
  };

  /**
   * get the sublevel markup and generate whole the navBar markup and return it
   * @param  {Object} firstLevelItems
   * @return {String}
   */
  var _getFirstLevelHtml = function(firstLevelItems) {
    var eventClass = (firstLevelItems.items.length) ? ' has--sublevel' : '';
    var hasSublevel = (firstLevelItems.items.length) ? '<span class="icon-expand_more show--mobile"></span>' : '';
    var aria = (firstLevelItems.items.length) ? 'role="button" aria-haspopup="true" aria-expanded="false"' : '';
    var html = [
      '<li class="nav_items">',
      '<a href="' + firstLevelItems.url + '" class="nav_links' + eventClass + '"' + aria + ' target="_blank">' + firstLevelItems.label,
      hasSublevel,
      '</a>'
    ];

    if (firstLevelItems.items.length) {
      html.push(_getSubLevelHtml(firstLevelItems.items));
    }
    html.push('</li>');
    html = html.join('');
    return html;
  };

  /**
   * remove all the expanded classes
   * the expanded class name is in the app.config
   * @param  {Array} elements
   */
  var _cleanIsExpandedClasses = function(elements) {
    elements.forEach(function(item) {
      if (_containClass(item.parentNode)) {
        _changeAriaAttr(item);
        _removeElementClass([item.parentNode]);
      }
    });
  };

  /**
   * return the DOM element or elements
   * @param  {String} element
   * @return {Object}
   */
  var _getElement = function(element) {
    return document.getElementsByClassName(element);
  };

  /**
   * add the expanded class to the elements
   * the expanded class name is in the app.config
   * @param {Array} els
   */
  var _addElementClass = function(els) {
    els.forEach(function(el) {
      el.classList.add(app.config.isExpanded);
    });
  };

  /**
   * remove the expanded class to the elements
   * the expanded class name is in the app.config
   * @param {Array} els
   */
  var _removeElementClass = function(els) {
    els.forEach(function(el) {
      el.classList.remove(app.config.isExpanded);
    });
  };

  /**
   * check if the element have the expanded class
   * the expanded class name is in the app.config
   * @param {Oobject} els
   * @return {Boolean}
   */
  var _containClass = function(el) {
    return el.classList.contains(app.config.isExpanded);
  };

  /**
   * change the aria-expanded attribute value
   * @param  {Object} el
   */
  var _changeAriaAttr = function(el) {
    var value = (el.getAttribute('aria-expanded') === 'false') ? 'true' : 'false';
    el.setAttribute('aria-expanded', value);
  };

  /**
   * show the mask and the sublevel when you click in any navbar item
   * removing or adding the expanded class
   * @param  {Array} elements
   */
  var _navEvents = function(elements) {
    event.preventDefault();
    var parent = event.target.parentNode;

    if (!_containClass(parent)) {
      _cleanIsExpandedClasses(elements);
      _addElementClass([element.elMask, parent]);
      _changeAriaAttr(event.target);
    }else {
      if (window.innerWidth > 768) {
        _removeElementClass([element.elMask]);
      }
      _removeElementClass([parent]);
      _changeAriaAttr(event.target);
    }
  };

  /**
   * change the toggle icon to the close icon, show the left navbar and the mask
   * change the close icon to the toggle icon, hide the left navbar and the mask
   * removing or adding the expanded class
   */
  var _hamEvent = function() {
    event.preventDefault();
    // var elNav = _getElement(app.config.nav);
    // var elHeader = _getElement(app.config.header);
    // var elMask = _getElement(app.config.mask);
    // var elHam = _getElement(app.config.toggleSlide);

    if (!_containClass(element.elNav)) {
      _addElementClass([element.elNav, element.elHeader, element.elMask, element.elMain]);
    }else {
      _removeElementClass([element.elNav, element.elHeader, element.elMask, element.elMain]);
    }
    _changeAriaAttr(element.elHam);
  };

  /**
   * close the opened sublevel, hide the left navbar
   * change the close icon to the toggle icon
   * removing all the expanded classes
   * @param  {Array} elements [description]
   */
  var _maskEvent = function(elements) {
    _removeElementClass([event.target]);
    _cleanIsExpandedClasses(elements);
    if (window.innerWidth < 768) {
      // var elNav = _getElement(app.config.nav);
      // var elHeader = _getElement(app.config.header);
      // var elHam = _getElement(app.config.toggleSlide);
      _removeElementClass([element.elNav, element.elHeader, element.elMain, event.target]);
      _changeAriaAttr(element.elHam);
    }
  };

  /**
   * handle the event to the differents DOM elements
   */
  var _handleEvents = function() {
    var elements = _getElement(app.config.subLevel);
    element.elHam = _getElement(app.config.toggleSlide)[0];
    element.elMask = _getElement(app.config.mask)[0];
    element.elHeader = _getElement(app.config.header)[0];
    element.elNav = _getElement(app.config.nav)[0];
    element.elMain = _getElement(app.config.main)[0];

    elements = [].slice.call(elements);
    elements.forEach(function(item) {
      item.addEventListener('click', _navEvents.bind(this, elements));
    });
    element.elHam.addEventListener('click', _hamEvent.bind(this));
    element.elMask.addEventListener('click', _maskEvent.bind(this, elements));
  };

  /**
   * Navbar method to handle the Ajax call with a callback wating the server response
   * the config object should be set in the navBar initialization -> app.js
   * @param  {Object} config
   *
   * Navbar method to generate the markup with the data when the server respond
   * and create the DOM element and append to the parent element
   * the parent element  should be set in the config object -> app.js
   * @param  {Array}  navbarData
   */
  Object.defineProperties(Navbar.prototype, {
    fetch: {
      value: function(config) {
        var self = this;
        var data = app.fetch(config, function(data) {
          self.navBarHtml(JSON.parse(data));
        }/*.bind(this)*/); // I can't use bind because all my tests breaks, therfore I have to use a self variable, I'm not so strong in tests
      }
    },
    navBarHtml: {
      value: function(navbarData) {
        var html = [];
        for (var items in navbarData.items) {
          // var navItems = navbarData.items[items];
          var navItems = new NavButton(navbarData.items[items]);
          html.push(navItems.getFirstLevelHtml(navItems));
        }
        html = html.join('');
        var mydiv = document.getElementById(this.parent);
        var mycontent = document.createElement(this.element);
        mycontent.className = app.config.navClass;
        mycontent.innerHTML = html;
        mydiv.appendChild(mycontent);
        _handleEvents();
      }
    }
  });

  /**
   * Method to initialize the Navbar
   * check if all the required parameters exist and if it is a string
   * the config object should be set in the navBar initialization -> app.js
   * @param  {Object} config [description]
   * @return {Object}
   */
  app.createNav = function(config) {
    if (config.hasOwnProperty('url') &&
      typeof config.url === 'string' &&
      config.hasOwnProperty('parent') &&
      typeof config.parent === 'string' &&
      config.hasOwnProperty('method') &&
      typeof config.method === 'string') {
      return new Navbar(config);
    }
    var err = new ReferenceError('need url, parent and method keys or shoudl be strings');
    throw err;
  };

  return app;
}(app));
