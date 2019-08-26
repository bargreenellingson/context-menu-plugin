import "./style.sass";
import Item from "./Item";
import Context from "./context";
import React from "react";

function defaultWrapper(props) {
  const { className, style } = props;
  return <div className={className} style={style}> {props.children} </div>;
}

export default props => {
  const {
    items,
    position: [x, y],
    visible,
    args,
    onClose,
    Components
  } = props;
  if (!visible) return null;

  if (!Components.Menu) {
    Components.Menu = defaultWrapper;
  }
  if (!Components.Item) {
    Components.Item = defaultWrapper;
  }

  return (
    <Context.Provider value={{ args, onClose }}>
      <Components.Menu
        items={items}
        className="context-menu"
        style={{ left: x + "px", top: y + "px" }}
      >
        {items.map(item => (
          <Item key={item.title} ItemComponent={Components.Item} item={item} />
        ))}
      </Components.Menu>
    </Context.Provider>
  );
};
