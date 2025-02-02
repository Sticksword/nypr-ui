import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nypr-ui/brand-header/header-left', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{nypr-ui/brand-header/header-left}}`);

    assert.dom(this.element).hasText('A list of our sites');

    // Template block usage:
    await render(hbs`
      {{#nypr-ui/brand-header/header-left}}
        template block text
      {{/nypr-ui/brand-header/header-left}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
