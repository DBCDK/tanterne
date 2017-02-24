import React from 'react';
import {Arrow} from '../svg/svg.container';

export class ToggleContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: props.show || false,
    }
  }

  onClick = (e) => {
    e.preventDefault();
    this.setState({show: !this.state.show});
  };

  render() {
    console.log(this.props.children);
    return (
      <div className="toggle-wrapper">
        {this.props.children.map(child => React.cloneElement(child, {show: this.state.show, onClick: this.onClick}))}
      </div>
    );
  }
}


export const ToggleButton = ({show, showText, hideText, onClick}) => {
  return (
    <a className="upper white border-decoration" href="#" onClick={onClick}>
      {show && hideText || showText} <span className="icon white"><Arrow
      className={`transition ${show && 'rotate-180' || ''}`}/></span>
    </a>
  );
};

export const ToggleContent = ({show, className = '', children}) => {
  return (
    <div className={`${className} ${show && 'show' || 'hidden'}`}>
      {children}
    </div>
  );
}

