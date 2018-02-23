import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  classNames: ['c-icons-list__item'],
  classNameBindings: ['isActive', 'isActive:js-active-icon'],
  icon: null,
  currentIcon: null,

  isActive: computed('currentIcon', function() {
    return get(this, 'icon') === get(this, 'currentIcon');
  }),

  click() {
    if (get(this, 'isActive')) {
      return;
    }

    this.attrs.setCurrentIcon(get(this, 'icon'));
  }
});
