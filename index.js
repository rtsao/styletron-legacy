'use strict';

var styletron = require('styletron');
var constants = styletron.constants;
var safeString = require('safe-string');

function renderStatic(renderFn) {
  styletron.reset();
  styletron.startBuffering();
  var html = renderFn();
  var css = styletron.flushBuffer();
  var keys = styletron.getInjectedKeys();

  return {
    html: html,
    css: safeString(css),
    hydrationSrc: generateScriptSrc(keys)
  };
}

module.exports = {
  renderStatic: renderStatic
};

function generateScriptSrc(keys) {
  var sanitizedKeys = safeString(JSON.stringify(keys));
  return [
    ';try {',
      'window["', constants.HYDRATE_KEY, '"] = ', sanitizedKeys, ';',
    '} catch(e) {};'
  ].join('');
}
