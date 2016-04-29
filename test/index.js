var test = require('tape');
var styletron = require('styletron');

var styletronServer = require('../');

test('server rendering', function(t) {
  var result = styletronServer.renderStatic(function mockRender() {
    styletron.injectOnce('.bar {}', 'bar');
    return 'html contents';
  });

  t.equal(result.html, 'html contents');
  t.equal(result.css, '.bar {}');
  t.equal(result.hydrationSrc,
    ';try {window["__GLOBAL_STYLETRON_HYDRATE@1__"] = ["bar"];} catch(e) {};');
  t.end();
});

test('reset before render', function(t) {
  // inject something before
  styletron.startBuffering();
  styletron.injectOnce('.foo {}', 'foo');

  var result = styletronServer.renderStatic(function mockRender() {
    styletron.injectOnce('.bar {}', 'bar');
    return 'html contents';
  });

  t.equal(result.html, 'html contents');
  t.equal(result.css, '.bar {}');
  t.equal(result.hydrationSrc,
    ';try {window["__GLOBAL_STYLETRON_HYDRATE@1__"] = ["bar"];} catch(e) {};');
  t.end();
});
