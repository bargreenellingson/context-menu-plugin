import './style.sass';
import Item from './Item';
import Context from './context';
import React from 'react';

export default ({ items, position: [x, y], visible, args, onClose, Components }) => {
    if(!visible) return null;
    
    return (
        <Context.Provider value={{ args, onClose}}>
            <Components.Menu className="context-menu" style={{ left: x+'px', top: y+'px' }}>
                {items.map(item => (
                    <Item key={item.title} ItemComponent={Components.Item} item={item} />
                ))}
            </Components.Menu>
        </Context.Provider>
    )
}
