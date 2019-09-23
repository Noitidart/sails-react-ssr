const React = require('react');
const ReactDOMServer = require('react-dom/server');

/**
 * View Engine Configuration
 * (sails.config.views)
 *
 * Server-sent views are a secure and effective way to get your app up
 * and running. Views are normally served from actions.  Below, you can
 * configure your templating language/framework of choice and configure
 * Sails' layout support.
 *
 * For details on available options for configuring server-side views, check out:
 * https://sailsjs.com/config/views
 *
 * For more background information on views and partials in Sails, check out:
 * https://sailsjs.com/docs/concepts/views
 */

module.exports.views = {

  /***************************************************************************
  *                                                                          *
  * Extension to use for your views. When calling `res.view()` in an action, *
  * you can leave this extension off. For example, calling                   *
  * `res.view('homepage')` will (using default settings) look for a          *
  * `views/homepage.ejs` file.                                               *
  *                                                                          *
  ***************************************************************************/

  // extension: 'ejs',

  /***************************************************************************
  *                                                                          *
  * The path (relative to the views directory, and without extension) to     *
  * the default layout file to use, or `false` to disable layouts entirely.  *
  *                                                                          *
  * Note that layouts only work with the built-in EJS view engine!           *
  *                                                                          *
  ***************************************************************************/

  layout: 'layouts/layout',

  locals: {

    getSsrStyleSheet: function() {
      return this.res.locals.ssrStyleSheet;
    },

    requireAndRenderString: function (containerId, path) {

      this.res.locals.ssrStyleSheet = `<link rel="stylesheet" href="/ssr/assets/js/pages/${path}/index.js.css">`;

      const { component } = require(`../.tmp/public/ssr/assets/js/pages/${path}/index.js`);

      const sailsLocalsScript = this.res.locals.exposeLocalsToBrowser({
        dontUnescapeOnClient: true
      });

      const SAILS_LOCALS = eval(
        sailsLocalsScript.substring(
          sailsLocalsScript.indexOf('>') + 1,
          sailsLocalsScript.lastIndexOf('<')
        )
        .replace('window.SAILS_LOCALS =', 'return')
      );

      return `<div id="${containerId}">${ReactDOMServer.renderToString(React.createElement(component.default, SAILS_LOCALS))}</div>`;
    }
  }

};
