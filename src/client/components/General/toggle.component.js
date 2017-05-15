import React from 'react';
import PropTypes from 'prop-types';
import {Arrow} from '../svg/svg.container';

export class ToggleContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: props.show || false
    };
  }

  onClick = (e) => {
    e.preventDefault();
    this.setState({show: !this.state.show});
  };

  render() {
    return (
      <div className="toggle-wrapper">
        {this.props.children.map(child => React.cloneElement(child, {show: this.state.show, onClick: this.onClick}))}
      </div>
    );
  }
}

ToggleContainer.propTypes = {
  show: PropTypes.bool
};

export const ToggleButton = ({show, showText, hideText, onClick}) => {
  return (
    <a className="upper white border-decoration toggle-button" href="#" onClick={onClick}>
      {show && hideText || showText} <span className="icon">
      <Arrow className={`transition ${show && 'rotate-180' || ''}`}/>
    </span>
    </a>
  );
};

/**
 *
 * @param {boolean} show
 * @param {String} className
 * @param {React.Component} content
 * @return {XML}
 * @constructor
 */
export const ToggleContent = ({show, className = '', content = null}) => {
  return (
    <div className={`${className}${show && 'show' || 'hidden'}`}>
      {content}
    </div>
  );
};

