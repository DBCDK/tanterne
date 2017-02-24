import React from 'react';

export class StateWrapper extends React.Component {

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
    state.removeListener(this.listener);
  }

  render() {
    const {Component, globalState} = this.props;
    return <Component {...this.state} globalState={globalState} />;
  }
}

