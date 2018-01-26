import FocusGroup from './FocusGroup';
import {
  identify,
  getElement,
  setRole,
  setTabIndex,
} from './utils';

const defaults = {
  activeClass: 'active',
  onChange: null,
};

class TabNav {
  constructor(elOrSelector, options = {}) {
    this.options = Object.assign({}, defaults, options);
    const { activeClass } = this.options;

    const el = getElement(elOrSelector);

    setRole(el, 'tablist');

    const focusGroup = new FocusGroup(el, {
      activeClass,
      onChange: this.onTabChange.bind(this),
    });

    this.contentsByTab = new Map();

    focusGroup.getItems().forEach((tab) => {
      const tabId = identify(tab);
      const contentId = tab.dataset.tabContentId;
      const content = document.querySelector(`#${contentId}`);

      tab.setAttribute('aria-controls', contentId);
      setRole(tab, 'tab');

      content.setAttribute('aria-labelledby', tabId);
      setRole(content, 'tabpanel');
      setTabIndex(content, 0);

      this.contentsByTab.set(tab, content);
    });

    focusGroup.trigger();
  }

  onTabChange(activeTab) {
    const { onChange } = this.options;
    let activeContent = null;

    this.contentsByTab.forEach((content, tab) => {
      const isActive = tab === activeTab;

      if (isActive) {
        activeContent = content;
      }

      tab.setAttribute('aria-expanded', isActive);
      content.style.setProperty('display', isActive ? '' : 'none');
    });

    if (onChange) {
      onChange(activeTab, activeContent);
    }
  }
}

export default TabNav;
