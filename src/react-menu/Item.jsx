import Context from './context';
import './style.sass';
import React from 'react';

class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleSubitems: false
        }
    }

    onClick = (e) => {
        const { item: { onClick } } = this.props;
        const { args, onClose } = this.context;

        e.stopPropagation();

        if(onClick) onClick(args);
        onClose();
    }

    render() {
        const { item: { title, subitems }, ItemComponent } = this.props;
        const { visibleSubitems } = this.state;

        return (
            <ItemComponent
                className={'item' + (subitems? ' hasSubitems': '')}
                onClick={this.onClick}
                onMouseOver={() =>
                  this.setState({ visibleSubitems: true })}
                onMouseLeave={() => this.setState({ visibleSubitems: false })}
                item={this.props.item}
            >
                {title}
                {subitems && visibleSubitems && <div className="subitems">
                    {subitems.map((subitem) => <Item key={subitem.title} item={subitem}/>)}
                </div>}
            </ItemComponent>
        )
    }
}

Item.contextType = Context;

export default Item;
