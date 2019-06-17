import ReactMenu, * as ReactComponents from './react-menu';
import VueMenu, * as VueComponents from './vue-menu';
import getMainMenu from './main-menu';
import getNodeMenu from './node-menu';
import IMenu from './menu';
import * as utils from './utils';

function install(editor, {
    searchBar = true,
    searchKeep = () => false,
    delay = 1000,
    items = {},
    nodeItems = {},
    allocate = () => [],
    rename = component => component.name,
    Menu = null,
    Components = {}
}) {
    if(!Menu) throw new TypeError('Menu must be defined');

    editor.bind('hidecontextmenu');
    const mainMenu = new (getMainMenu(Menu))(editor, { Components, searchBar, searchKeep, delay }, { items, allocate, rename });
    const nodeMenu = new (getNodeMenu(Menu))(editor, { Components, searchBar: false, delay }, nodeItems);

    editor.on('hidecontextmenu', () => {
        mainMenu.hide();
        nodeMenu.hide();
    });

    editor.on('click contextmenu', () => {
        editor.trigger('hidecontextmenu');
    });

    editor.on('contextmenu', ({ e, node }) => {
        e.preventDefault();
        e.stopPropagation();

        const [x, y] = [e.clientX, e.clientY];

        (node ? nodeMenu : mainMenu).show(x, y, { node });
    });
}

export {
    VueMenu,
    VueComponents,
    ReactMenu,
    ReactComponents,
    IMenu,
    utils
}

export default {
    name: 'context-menu',
    install
}
