import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nypr multi card', function(hooks) {
  setupRenderingTest(hooks);

  test('basic usage', async function(assert) {

    await render(hbs`{{nypr-multi-card}}`);

    assert.dom(this.element).hasText('', 'no op without block');

    // Template block usage:
    await render(hbs`
      {{#nypr-multi-card as |m|}}
        {{#m.panel to=1 as |panel|}}
          Panel 0.
          {{panel.button class="test-button" text="Show me the next panel"}}
        {{/m.panel}}
        
        {{#m.panel to=0 as |panel|}}
          Panel 1.
          {{#panel.button}}You can also open the button if you want more complicated markup{{/panel.button}}
        {{/m.panel}}
      {{/nypr-multi-card}}
    `);

    assert.ok(this.element.textContent.trim().match('Panel 0.'), 'only active panel should render');
    assert.notOk(this.element.textContent.trim().match('Panel 1.'), 'inactive panel should not be rendered');
    
    await click('.test-button');
    
    assert.ok(this.element.textContent.trim().match('Panel 1.'), 'active panel should be render');
    assert.notOk(this.element.textContent.trim().match('Panel 0.'), 'inactive panel should not render');
  });

  test('advanced usage', async function(assert) {

    await render(hbs`
      {{#nypr-multi-card as |m|}}
        
        {{#m.panel to=1 as |panel|}}
          {{panel.header title="Welcome"}}
          <p>
            Hello and welcome.
          </p>
          {{#panel.button class='test-button'}}Go To History{{/panel.button}}

        {{/m.panel}}
        
        {{#m.panel title="Your History" to=2 as |panel|}}
          {{#panel.header as |header|}}
            {{#panel.button class='test-button'}}Go To Info{{/panel.button}}
            {{header.title}}
          {{/panel.header}}
          
          Panel Body
        {{/m.panel}}
        
        {{#m.panel title="Your Info" to=0 as |panel|}}
          {{#panel.header as |header|}}
            {{#panel.button}}Back{{/panel.button}}
            {{header.title}}
            {{#header.button class='header-button' click=(action (mut isEditing) (not isEditing))}}
              {{if isEditing 'Save' 'Edit'}}
            {{/header.button}}
          {{/panel.header}}
        
        {{/m.panel}}
        
      {{/nypr-multi-card}}
    `);
    
    assert.ok(this.element.textContent.trim().match('Hello and welcome.'), 'only active panel should render');
    assert.notOk(this.element.textContent.trim().match('Your History'), 'inactive panel should not be rendered');
    assert.notOk(this.element.textContent.trim().match('Your Info'), 'inactive panel should not be rendered');
    
    await click('.test-button');
    
    assert.notOk(this.element.textContent.trim().match('Hello and welcome.'), 'panel 1 is hidden');
    assert.ok(this.element.textContent.trim().match('Your History'), 'panel 2 is rendered');
    assert.notOk(this.element.textContent.trim().match('Your Info'), 'panel 3 is hidden');
    
    await click('.test-button');
    
    assert.notOk(this.element.textContent.trim().match('Hello and welcome.'), 'panel 1 is hidden');
    assert.notOk(this.element.textContent.trim().match('Your History'), 'panel 2 is hidden');
    assert.ok(this.element.textContent.trim().match('Your Info'), 'panel 3 is rendered');
    
    assert.dom('.header-button').hasText('Edit');
    await click('.header-button');
    assert.dom('.header-button').hasText('Save', 'card button can fire an action');
  });
});
