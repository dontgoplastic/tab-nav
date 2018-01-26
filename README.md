# tab-nav

An easy-to-use, zero-dependency, and accessible tab navigation component

[Demo](https://dontgoplastic.github.io/tab-nav/demo)

## How to use

Create a list with corresponding content targets:

```html
<ul id="repo-nav">
  <li data-tab-content-id="all">All</li>
  <li data-tab-content-id="public">Public</li>
  <li data-tab-content-id="private">Private</li>
</ul>

<section id="all"> ... </section>
<section id="public"> ... </section>
<section id="private"> ... </section>
```

Kick off a TabNav:

```js
new TabNav('#repo-nav');
```

Instances can be configured with a few options:

```js
new TabNav('#repo-nav', {
  activeClass: 'active',
  onChange: (tabElement, contentElement) => {
    // ...
  }
});
```
| Name | Default Value | Description |
| --- | --- | --- |
| activeClass | `'active'` | Class applied to expanded tabs |
| onChange | `null` | Callback for when expaned tabs change. Provides the tab and revealed content target elements as arguments |



## Styles

Bring your own!

## What it does

* `role` attribute values `tablist`, `tab`, and `tabpanel` will be added to the list, list items, and content targets.
* `tabindex="0"` added to the expanded tab and all content targets.
* With a tab focused, <kbd>↑</kbd> or <kbd>←</kbd> will focus the previous tab, <kbd>↓</kbd> or <kbd>→</kbd> the next.
* Tabs will be expanded on mouse click. Focused tabs will can be expanded by pressing either <kbd>Enter</kbd> or <kbd>Space</kbd>.
* A tab with the `activeClass` (or the first tab if not present) will be auto-expanded.
* All non-expanded content targets will be hidden via `display: none;`.
* If ids aren't already present, unique ids are auto-assigned to all tabs and content targets to facilitate `aria-labelledby` and `aria-controls` hook-up.