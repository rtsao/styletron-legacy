# styletron-server

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

A server-rendering helper module for [`styletron`](https://github.com/rtsao/styletron)

## Usage

#### Extracting "injected" CSS at render-time on the server

```js
const renderApp = require('./render-my-app-fn');
/**
 * `renderApp` is some function that renders your app, returning a string of HTML. 
 * This function should also result in `injectOnce` being called at some point.
 */
const styletronServer = require('styletron-server');
const {html, css, hydrationSrc} = styletronServer.renderStatic(() => {
  const html = renderApp();
  return html;
}

/**
 * `html` is simply the return value of the function passed into `renderStatic`.
 * It is passed through for convenience.
 */

/**
 * `css` is a string containing all the css that was passed into `injectOnce`
 * during the render. When you send down the HTML to the client, you should set this
 * as the contents of <style data-styletron></style> in the <head>.
 * This string should be sanitized before being set as contents into HTML.
 */

/**
 * `hydrationSrc` is a string of JS source code to hydrate styletron on the
 * client. This prevents re-injection of styles rendered onthe server. Set this string
 * as the contents of a <script> element before your main bundle.
 */
```

[build-badge]: https://travis-ci.org/rtsao/styletron-server.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/styletron-server
[deps-badge]: https://david-dm.org/rtsao/styletron-server.svg
[deps-href]: https://david-dm.org/rtsao/styletron-server
[npm-badge]: https://badge.fury.io/js/styletron-server.svg
[npm-href]: https://www.npmjs.com/package/styletron-server
