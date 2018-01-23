import {
  setTabIndex,
  setAriaSelected,
  identify,
  getElement,
} from './utils';

const Key = {
  RETURN: 13,
  SPACE_BAR: 32,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
};

class FocusGroup {
  constructor(el, options = {}) {
    el = getElement(el);

    this.options = Object.assign({}, {
      activeClass: 'active',
      onItemClick: null,
    }, options);

    const { activeClass, onItemClick } = this.options;

    this.el = el;
    this.items = Array.from(el.children);
    const activeItem = this.items.find(item => item.classList.contains(activeClass)) || this.items[0];

    this.el.addEventListener('keydown', ({target, keyCode}) => {
      switch(keyCode) {
        case Key.LEFT:
        case Key.UP:
          this.focusPrevious(target);
          break;
        case Key.RIGHT:
        case Key.DOWN:
          this.focusNext(target);
          break;
        case Key.RETURN:
        case Key.SPACE_BAR:
          target.click();
          break;
      }
    });

    this.items.forEach(item => {
      item.addEventListener('blur', ({relatedTarget}) => {
        if (!this.el.contains(relatedTarget)) {
          this.updateTabIndexes();
        }
      });
      
      item.addEventListener('click', () => {
        this.setActiveItem(item);
        if (onItemClick) {
          onItemClick(item, this);
        }
      });
    });

    this.setActiveItem(activeItem);
  }

  getItems() {
    return this.items;
  }

  getActiveItem() {
    return this.items[this.activeIndex];
  }

  focusPrevious(item) {
    const itemIndex = this.items.indexOf(item);

    const index = itemIndex === 0 ?
      this.items.length - 1 :
      itemIndex - 1;

    this.focusItem(this.items[index]);
  }

  focusNext(item) {
    const itemIndex = this.items.indexOf(item);

    const index = itemIndex === this.items.length - 1 ?
      0 :
      itemIndex + 1;

    this.focusItem(this.items[index]);
  }

  focusItem(item) {
    this.items.forEach(el => {
      setAriaSelected(el, el === item);
      setTabIndex(el, -1);
    });

    item.focus();
  }

  setActiveItem(item) {
    const index = this.items.indexOf(item);
    this.setActiveIndex(index);
  }

  setActiveIndex(index) {
    if (index === this.activeIndex) {
      return;
    }

    this.activeIndex = index;
    this.updateTabIndexes();
  }

  updateTabIndexes() {
    const { activeIndex } = this;
    const { activeClass } = this.options;

    this.items.forEach((el, index) => {
      const isActive = index === activeIndex;

      el.classList.toggle(activeClass, isActive);
      setAriaSelected(el, isActive);
      setTabIndex(el, isActive ? 0 : -1);
    });
  }

}


export default FocusGroup;