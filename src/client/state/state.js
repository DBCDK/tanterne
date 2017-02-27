import React from 'react';
import StateWrapper from './stateWrapper.component';

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

  getHierarchy = () => {
    this.setState({
      hierarchy: [{
        name: 'Andre verdensdele',
        dk5: '48',
        contains: [
          {
            name: 'Asien',
            dk5: '48.1',
            contains: [
              {
                name: 'Sydasien',
                dk5: '48.23',
                contains: [
                  {
                    name: 'Indien',
                    dk5: '48.231',
                    isSelected: true,
                    data: {
                      description: 'This is a description',
                      topics: ['Andemanerne', 'Bengalen', 'Ganges', 'Goa', 'Kashmir', 'Laccadiverne']
                    }
                  },
                  {
                    name: 'Bangladesh',
                    dk5: '48.233'
                  },
                  {
                    name: 'Bhutan',
                    dk5: '48.235'
                  },
                  {
                    name: 'Maldiverne',
                    dk5: '48.238'
                  }
                ]
              }
            ]
          }]
      }]
    });
  }
}

setTimeout(() => globalState.getHierarchy(), 200);

const globalState = new State();

export function wrapper(Component, listenTo) {
  const WrapperComponent = () => <StateWrapper Component={Component} listenTo={listenTo} globalState={globalState}/>;
  return WrapperComponent;
}
