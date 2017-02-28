import * as api from './client';

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
    api.hierarchy(index)
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

export default new State();
