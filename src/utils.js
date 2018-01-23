function setTabIndex(el, value) {
  el.setAttribute('tabindex', value);
}

function setAriaSelected(el, value) {
  el.setAttribute('aria-selected', value);
}

function setRole(el, value) {
  el.setAttribute('role', value);
}

let idCounter = 0;

function identify(el) {
  const id = el.getAttribute('id');

  if (id) {
    return id;
  }

  const autoId = 'auto-id-' + new Date().getTime() + '-' + (idCounter += 1);

  el.setAttribute('id', autoId);

  return autoId;
}

function getElement(el) {
  if (el instanceof Element) {
    return el;
  }

  return document.querySelector(el);
}

export {
  setTabIndex,
  setAriaSelected,
  setRole,
  identify,
  getElement,
}