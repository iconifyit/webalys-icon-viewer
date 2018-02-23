import Controller from 'ember-controller';
import set from 'ember-metal/set';

export default Controller.extend({
  queryParams: ['category', 'query'],
  category: null,
  query: '',

  actions: {
    setSearchQuery(query) {
      set(this, 'query', query);
    }
  }
});
