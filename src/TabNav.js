import FocusGroup from './FocusGroup';
import {
  identify,
  getElement,
  setRole,
  setTabIndex,
} from './utils';

class TabNav {
  constructor(el, options = {}) {
    el = getElement(el);

    setRole(el, 'tablist');

    const focusGroup = new FocusGroup(el, {
      onItemClick: this.onTabClick.bind(this)
    });

    this.contentsByTab = new Map();

    focusGroup.getItems().forEach(tab => {
      const tabId = identify(tab);
      const contentId = tab.dataset.tabContentId;
      const content = document.querySelector('#' + contentId);

      tab.setAttribute('aria-controls', contentId);
      setRole(tab, 'tab');

      content.setAttribute('aria-labelledby', tabId);
      setRole(content, 'tabpanel');
      setTabIndex(content, 0);

      this.contentsByTab.set(tab, content);
    });

    this.onTabClick(focusGroup.getActiveItem());
  }

  onTabClick(item) {
    this.contentsByTab.forEach((content, tab) => {
      const isActive = tab === item;

      tab.setAttribute('aria-expanded', isActive);
      content.style.display = isActive ? '' : 'none';
    })

  }
}

export default TabNav;