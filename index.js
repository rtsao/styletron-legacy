'use strict';

var styletron = require('styletron');
var constants = styletron.constants;

function renderStatic(renderFn) {
  styletron.reset();
  styletron.startBuffering();
  var html = renderFn();
  var css = styletron.flushBuffer();
  var keys = styletron.getInjectedKeys();
  var scriptSrc = [
    ';try {',
      'window["', constants.HYDRATE_KEY, '"] = ', JSON.stringify(keys), ';',
    '} catch(e) {};'
  ].join('');

  return {
    html: html,
    css: css,
    hydrationSrc: scriptSrc
  };
}

module.exports = {
  renderStatic: renderStatic
};
