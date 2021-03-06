/**
 * @file
 * Wrap a component in a statefull container.
 *
 * Props are updated when globalState changes.
 * It is possible to transfer props to the wrapped component, using the transfer property.
 */

import React from 'react';

export default class StateWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.globalState.getState(props.listenTo);
  }

  componentDidMount() {
    this.listener = this.props.globalState.listenTo(this.props.listenTo, (newState) => {
      this.setState(newState);
    });
  }

  componentWillUnmount() {
    this.props.globalState.removeListener(this.listener);
  }

  render() {
    const {Component, globalState, transfer} = this.props;
    return <Component {...transfer} {...this.state} globalState={globalState} />;
  }
}

