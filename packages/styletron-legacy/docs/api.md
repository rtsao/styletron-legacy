# API documentation

<!-- div class="toc-container" -->

<!-- div -->

## `Methods`
* <a href="#flushBuffer">`flushBuffer`</a>
* <a href="#getInjectedKeys">`getInjectedKeys`</a>
* <a href="#injectOnce">`injectOnce`</a>
* <a href="#injectStylesIntoHead">`injectStylesIntoHead`</a>
* <a href="#markAsInjected">`markAsInjected`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `Methods`

<!-- div -->

<h3 id="flushBuffer"><a href="#flushBuffer">#</a>&nbsp;<code>flushBuffer()</code></h3>
[&#x24C8;](https://github.com/rtsao/styletron/blob/master/index.js#L112 "View in source") [&#x24C9;][1]

Flushes the buffer and returns its contents

#### Returns
*(string)*: contents of CSS buffer

---

<!-- /div -->

<!-- div -->

<h3 id="getInjectedKeys"><a href="#getInjectedKeys">#</a>&nbsp;<code>getInjectedKeys()</code></h3>
[&#x24C8;](https://github.com/rtsao/styletron/blob/master/index.js#L158 "View in source") [&#x24C9;][1]

Returns an array of keys for already injected styles

#### Returns
*(array)*: array of keys

---

<!-- /div -->

<!-- div -->

<h3 id="injectOnce"><a href="#injectOnce">#</a>&nbsp;<code>injectOnce(css, [key])</code></h3>
[&#x24C8;](https://github.com/rtsao/styletron/blob/master/index.js#L72 "View in source") [&#x24C9;][1]

Injects the given css with the given unique into into the buffer. If in the
browser, also schedules the style buffer to be flushed and injected into the
document `<head>`. If css for the given unique key has already been injected,
it is ignored.

#### Arguments
1. `css` *(string)*: the css to inject
2. `[key]` *(string)*: unique key for the css

#### Returns
*(boolean)*: if the css will be injected

---

<!-- /div -->

<!-- div -->

<h3 id="injectStylesIntoHead"><a href="#injectStylesIntoHead">#</a>&nbsp;<code>injectStylesIntoHead(css)</code></h3>
[&#x24C8;](https://github.com/rtsao/styletron/blob/master/index.js#L126 "View in source") [&#x24C9;][1]

Injects css into a `<style>` element in the document head.
If a styletron `<style>` element exists in the document head
it will be used, otherwise one will be created.

#### Arguments
1. `css` *(string)*: string of css

---

<!-- /div -->

<!-- div -->

<h3 id="markAsInjected"><a href="#markAsInjected">#</a>&nbsp;<code>markAsInjected(key)</code></h3>
[&#x24C8;](https://github.com/rtsao/styletron/blob/master/index.js#L149 "View in source") [&#x24C9;][1]

Marks a key as already injected

#### Arguments
1. `key` *(string)*: unique key to mark as injected

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #methods "Jump back to the TOC."
