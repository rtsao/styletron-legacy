'use strict';

var constants = require('./constants');

// *********************
// Singleton enforcement
// *********************

var topLevel = typeof global !== 'undefined'
  ? global
  : typeof window !== 'undefined'
    ? window
    : {};

var styletron = topLevel[constants.INSTANCE_KEY];

if (!styletron) {
  styletron = topLevel[constants.INSTANCE_KEY] = {
    injectOnce: injectOnce,
    startBuffering: startBuffering,
    flushBuffer: flushBuffer,
    injectStylesIntoHead: injectStylesIntoHead,
    reset: reset,
    markAsInjected: markAsInjected,
    getInjectedKeys: getInjectedKeys,
    constants: constants
  };
}

module.exports = styletron;

// ************************
// Styletron implementation
// ************************

var asap = require('asap');

// Grab list of keys for pre-rendered styles
var preRenderedKeys =
  (typeof window !== 'undefined' && window[constants.HYDRATE_KEY]) || null;

// A placeholder for stored reference to style element.
var styleDOMElement;

// A set of unique keys corresponding already injected styles.
var alreadyInjected = 
  (Array.isArray(preRenderedKeys) && preRenderedKeys.length) ?
    objectFromKeys(preRenderedKeys) : {};

// A buffer of styles that have not yet been flushed.
var injectionBuffer = '';

// A flag to tell if we are already buffering styles. This could happen either
// because we scheduled a flush call already, so newly added styles will
// already be flushed, or because we are statically buffering on the server.
var isBuffering = false;

// **************
// Public methods
// **************

/**
 * Injects the given css with the given unique into into the buffer. If in the
 * browser, also schedules the style buffer to be flushed and injected into the
 * document `<head>`. If css for the given unique key has already been injected,
 * it is ignored.
 * 
 * @param  {string} css - the css to inject
 * @param  {string} [key] - unique key for the css
 * @returns {boolean}   - if the css will be injected
 */
function injectOnce(css, key) {
  if (alreadyInjected[key]) {
    return false;
  }

  if (!isBuffering) {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      // `styletron.startBuffering()` must be called before server rendering.
      // In this case (where no document exists and buffering not started), no
      // CSS will be added to the buffer for extraction on the server.
      return false;
    }

    isBuffering = true;
    asap(flushToStyleElement);
  }

  injectionBuffer += css;
  if (key !== undefined) {
    alreadyInjected[key] = true;
  }
  return true;
}

/**
 * Sets isBuffering flag to true. Should only be called by the server if
 * server rendering.
 */
function startBuffering() {
  if (isBuffering) {
    throw Error('Cannot buffer while already buffering');
  }
  isBuffering = true;
};

/**
 * Flushes the buffer and returns its contents
 * 
 * @returns {string} - contents of CSS buffer
 */
function flushBuffer() {
  isBuffering = false;
  var contents = injectionBuffer;
  injectionBuffer = '';
  return contents;
};

/**
 * Injects css into a `<style>` element in the document head.
 * If a styletron `<style>` element exists in the document head
 * it will be used, otherwise one will be created.
 * 
 * @param  {string} css - string of css
 */
function injectStylesIntoHead(css) {
  if (styleDOMElement === undefined) {
    var found = existingStyleElement();
    styleDOMElement = found ? found : appendToHead(createStyleElement());
  }
  styleDOMElement.appendChild(document.createTextNode(css));
}

/**
 * Resets the buffer
 */
function reset() {
  injectionBuffer = '';
  alreadyInjected = {};
  isBuffering = false;
  styleDOMElement = undefined;
};

/**
 * Marks a key as already injected
 * 
 * @param  {string} key - unique key to mark as injected
 */
function markAsInjected(key) {
  alreadyInjected[key] = true;
}

/**
 * Returns an array of keys for already injected styles
 * 
 * @returns {array} - array of keys
 */
function getInjectedKeys() {
  return Object.keys(alreadyInjected);
}

// ***************
// Private Methods
// ***************

function flushToStyleElement() {
  var css = flushBuffer();
  if (css.length > 0) {
    injectStylesIntoHead(css);
  }
};

// *******
// Helpers
// *******

function appendToHead(element) {
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(element);
  return element;
}

function existingStyleElement() {
  return document.querySelector('style[data-styletron]');
}

function createStyleElement() {
  var element = document.createElement('style');
  element.type = 'text/css';
  element.setAttribute('data-styletron', '');
  return element;
}

function objectFromKeys(keysArray) {
  return keysArray.reduce(function(acc, key) {
    acc[key] = true;
    return acc;
  }, {});
}
