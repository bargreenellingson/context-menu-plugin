Rete context menu plugin
====
#### Rete.js plugin

```js
import ContextMenuPlugin from 'rete-context-menu-plugin';

editor.use(ContextMenuPlugin, {
    searchBar: false,
    delay: 100,
    allocate(component) {
        return ['Submenu']
    },
    items: {
        'Click me'(){ console.log('Works!') }
    }
});
```
| Options | Description | Default |
|-|-|-|
| `searchBar` | Showing search bar | `true`
| `delay` | Delay hide, ms | `1000`
| `allocate` | function for placing of components into submenu | `() => []`
| `items` | custom items (`Object` with nested objects and functions) | `{}`


You can arbitrarily put a component in a submenu. Examples: 

```js
allocate() { return ["Single submenu"] }
```

```js
allocate(component) { return component.path } // where path is a stack of menu for every component
```


```js
allocate(component) { return null } // exclude component from menu items
```