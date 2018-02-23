import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import copyToClipboard from 'icon-viewer/utils/copy-to-clipboard';
import makeSvg from 'icon-viewer/utils/make-svg';

function doesMatch(target, query) {
  if (!target) {
    return false;
  }

  return target.toLowerCase().indexOf(query.toLowerCase()) !== -1;
}

export default Component.extend({
  classNames: ['l-container'],
  model: null,
  category: null,
  currentIcon: null,
  searchQuery: null,

  icons: computed.alias('foundIcons'),

  filteredIcons: computed('category', function() {
    let icons = get(this, 'model.icons');
    let category = get(this, 'category');

    return category ? icons.filterBy('category', category) : icons;
  }),

  foundIcons: computed('filteredIcons', 'searchQuery', function() {
    let icons = get(this, 'filteredIcons');
    let query = get(this, 'searchQuery');

    if (query && query.length > 1) {
      icons = icons.filter((icon) => doesMatch(icon.name, query));
    }

    return icons;
  }),

  animateCurrentIcon() {
    this.$('.js-active-icon')
      .velocity('callout.pulse', { duration: 300 });
  },

  downloadIcon(icon) {
    let svgFile = new Blob([makeSvg(icon.svg)], { type: 'image/svg+xml' });
    window.saveAs(svgFile, `${icon.name}.svg`);
    this.animateCurrentIcon();
  },

  copyIcon(icon) {
    if (copyToClipboard(makeSvg(icon.svg))) {
      this.animateCurrentIcon();
      event.preventDefault();
    } else {
      this.showClipboardError();
    }
  },

  showClipboardError() {
    // eslint-disable-next-line no-alert
    window.alert(
      "Your browser doesn't support copy to clipboard feature.\n" +
      'Use the icon viewer with a modern browser, such as Chrome or Firefox.'
    );
  },

  actions: {
    setCurrentIcon(icon) {
      set(this, 'currentIcon', icon);
    },

    copyCurrentIcon() {
      let currentIcon = get(this, 'currentIcon');

      if (currentIcon) {
        this.copyIcon(currentIcon);
      }
    },

    downloadCurrentIcon() {
      let currentIcon = get(this, 'currentIcon');

      if (currentIcon) {
        this.downloadIcon(currentIcon);
      }
    }
  }
});
