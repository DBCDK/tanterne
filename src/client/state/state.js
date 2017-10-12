import React from 'react';
import StateWrapper from './stateWrapper.component';
import * as client from './client';

class State {

  constructor() {
    this.listeners = [];
    this.state = {
      hierarchy: []
    };
  }

  listenTo(props, cb) {
    this.listeners = this.listeners.concat([{props, cb}]);
    return cb;
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(({cb}) => cb !== listener);
  }

  onChange() {
    this.listeners.forEach(({cb, props}) => cb(this.getState(props)));
  }

  setState(newState) {
    this.state = Object.assign(this.state, newState);
    this.onChange();
  }

  getState(props) {
    const state = {};
    props.forEach(prop => {
      state[prop] = this.state[prop] || null;
    });
    return state;
  }

  getHierarchy = (index) => {
    const currentHierarchy = this.getState(['hierarchy']);
    client.hierarchy(index)
      .then(hierarchy => {
        if (hierarchy.index) {
          this.setState({hierarchy});
        }
      })
      .catch(err => {
        currentHierarchy.error = err;
        this.setState({hierarchy: currentHierarchy});
      });
  }
}

const globalState = new State();

export function wrapper(Component, listenTo) {
  const WrapperComponent = (props) => {
    return (
      <StateWrapper Component={Component} listenTo={listenTo} globalState={globalState} transfer={props} />
    );
  };
  return WrapperComponent;
}
