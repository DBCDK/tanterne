import React from 'react';
import {CartButton} from '../Cart/CartButton.component';

export default class ComparerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  parseAndReplaceDK5(text) {
    if (!text) {
      return null;
    }

    const parts = text.split(/<dk>([^<]*)<\/dk>/g);
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = <span className="match" key={i} onClick={this.props.cart.addOrRemoveContent.bind(this, {index: parts[i]})}>{parts[i]}</span>;
    }

    return (<div>{parts}</div>);
  }

  getItems(data) {
    if (!data) {
      return null;
    }

    const note = this.parseAndReplaceDK5(data.note);

    return (
      <div className="comparer--item">
        <div className="comparer--item--header">
          <span className="comparer--item--index"><h2>{data.index}</h2></span>
          <span className="comparer--item--cartButton">
            <CartButton index={data.index} cart={this.props.cart}/>
          </span>
        </div>
        <span className="comparer--item--title"><h4>{data.title}</h4></span>
        <span className="comparer--item--note">{note}</span>
      </div>
    );
  }

  render() {
    const items = Object.keys(this.props.cart.contents).map((index) => {
      const data = this.props.cart.contents[index].data;
      return this.getItems(data);
    });

    return (
      <div id="comparer" className={items.length ? 'show-cart' : 'show-cart'}>
        <div className="comparer--content">
          <span className="comparer--content--headline">Sammenlign poster</span>
          <div className="comparer--content--items-container">{items}</div>
        </div>
      </div>
    );
  }
}

ComparerContainer.propTypes = {
  cart: React.PropTypes.object.isRequired
};
