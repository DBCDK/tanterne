import React from 'react';
import PropTypes from 'prop-types';
import {CartButton} from '../Cart/CartButton.component';

export default class ComparerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  parseAndReplaceDK5(text) {
    if (!text) {
      return null;
    }

    // Replace pseudo-linebreaks
    text = text.replace(/<br >/gi, '\n\n');

    // Filter any DK5 and make them clickable
    const parts = text.split(/<dk>([^<]*)<\/dk>/g);

    for (let i = 1; i < parts.length; i += 2) {
      let part = parts[i];
      if (part.includes('-')) {
        part = part.split('-');
        parts[i] = (
          <span>
            <span className='blue pointer' key={i} onClick={this.props.cart.addOrRemoveContent.bind(this, {index: part[0]})}>{part[0]}</span>
            -
            <span className='blue pointer' key={i} onClick={this.props.cart.addOrRemoveContent.bind(this, {index: part[1]})}>{part[1]}</span>
          </span>
        );
      }
      else {
        parts[i] =
          <span className='blue pointer' key={i} onClick={this.props.cart.addOrRemoveContent.bind(this, {index: part})}>{part}</span>;
      }
    }

    return (<div>{parts}</div>);
  }

  getAspects(aspects) {
    return aspects.map((aspect, index) => {
      return (<li key={index}>
        <span>- </span>
        <span className="comparer--item--aspects--aspect--title">{aspect.title} </span>
        {
          aspect.parent ?
            <span>
              <span className='blue pointer' onClick={this.props.cart.addOrRemoveContent.bind(this, {index: aspect.index})}>{aspect.index}</span>
              <span> {aspect.parent.title}</span>
            </span> :
            <span className=''>{aspect.index}</span>
        }
      </li>);
    });
  }

  getItems(data) {
    if (!data) {
      return null;
    }

    const note = this.parseAndReplaceDK5(data.noteSystematic);
    const aspects = this.getAspects(data.aspects);

    return (
      <div className="comparer--item" id={`item-index-${data.index}`}>
        <div className="comparer--item--header">
          <span className="comparer--item--index"><h2>{data.index}</h2></span>
          <span className="comparer--item--cartButton">
            <CartButton index={data.index} cart={this.props.cart}/>
          </span>
        </div>
        <span className="comparer--item--title"><h4>{data.title}</h4></span>
        <span className="comparer--item--note">{note}</span>
        {
          aspects.length >= 1 &&
          <div className="comparer--item--aspects">
            <h4>Se også</h4>
            <ul className="comparer--item--aspects--list">{aspects}</ul>
          </div>
        }
      </div>
    );
  }

  render() {
    const items = Object.keys(this.props.cart.contents).map((index) => {
      const data = this.props.cart.contents[index].data;
      return this.getItems(data);
    });

    const classNames = [items.length ? 'show-cart' : '', this.props.cart.isToggled ? 'toggle-cart' : ''].join(' ');

    return (
      <div id="comparer" className={classNames}>
        <div className="comparer--content">
          <div className="comparer--content--items-container">{items.length ? items : 'Der er ingenting i kurven'}</div>
        </div>
      </div>
    );
  }
}

ComparerContainer.propTypes = {
  cart: PropTypes.object.isRequired
};
