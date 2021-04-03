import loadingIcon from 'nypr-ui/utils/animated-loading-icon';
import { module, test } from 'qunit';

module('Unit | Utility | animated loading icon', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {

    let canvas = document.createElement('canvas');
    let result = loadingIcon(canvas, {});
    assert.ok(result);
  });
});
