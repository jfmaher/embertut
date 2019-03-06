import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

module('Integration | Component | list-filter', function(hooks) {
  setupRenderingTest(hooks);

  test('should initially load all listings', async function (assert) {
    this.set('testFilter', () => Promise.resolve({results: ITEMS}));

    await render(hbs`
      <ListFilter @filter={{action testFilter}} as |filtered|>
        <ul>
          {{#each filtered as |item|}}
            <li class="city">{{item.city}}</li>
          {{/each}}
        </ul>
      </ListFilter>`);

    return settled().then(() => {
      assert.equal(this.element.querySelectorAll('.city').length, 3);
      assert.equal(this.element.querySelector('.city').textContent.trim(), 'San Francisco');
    });
  });
});
