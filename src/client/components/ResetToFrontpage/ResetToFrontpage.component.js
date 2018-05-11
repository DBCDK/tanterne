import React from 'react';
import PropTypes from 'prop-types';

export default class ResetToFrontpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: {active: false},
      warning: {active: false, remaining: 30}
    };
  }

  componentDidMount() {
    // Add keyPress event listeners
    document.addEventListener('mousemove', this.resetTimer.bind(this), true);
    document.addEventListener('mousewheel', this.resetTimer.bind(this), true);
    document.addEventListener('scroll', this.resetTimer.bind(this), true);
    document.addEventListener('keydown', this.resetTimer.bind(this), true);
  }

  componentWillUnmount() {
    // Remove keyPress event listeners
    document.removeEventListener('mousemove', this.resetTimer.bind(this), true);
    document.removeEventListener(
      'mousewheel',
      this.resetTimer.bind(this),
      true
    );
    document.removeEventListener('scroll', this.resetTimer.bind(this), true);
    document.removeEventListener('keydown', this.resetTimer.bind(this), true);
  }

  componentDidUpdate() {
    if (!this.state.timer.active && this.props.timerEnabled) {
      this.setTimeout();
    }
  }

  resetTimer() {
    this.setTimeout();
  }

  resetToFrontpage() {
    window.location = '/';
  }

  setResetWarning(delay) {
    this.intervalId = setInterval(() => {
      if (delay <= 0) {
        this.resetToFrontpage();
      }

      this.setState({warning: {active: true, remaining: delay}});
      --delay;
    }, 1000);
  }

  setTimeout() {
    const delay = this.props.testEnv ? 5000 : 120000;
    this.setState({warning: {active: false, remaining: 30}});
    if (!this.props.timerEnabled) {
      return;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.setState({timer: {active: true}});
    this.timeoutId = setTimeout(() => {
      const redirectDelay = this.props.testEnv ? 5 : 30;
      this.setResetWarning(redirectDelay);
    }, delay);
  }

  render() {
    return (
      <div>
        <div
          className={`reset-to-frontpage--container ${
            this.state.warning.active ? '' : 'hidden'
          }`}
        >
          <span className="reset-to-frontpage--text">
            Ved fortsat inaktivitet vil siden blive nulstillet til forsiden om{' '}
            {this.state.warning.remaining} sekunder
          </span>
        </div>
        {this.props.children}
      </div>
    );
  }
}

ResetToFrontpage.propTypes = {
  timerEnabled: PropTypes.bool.isRequired,
  testEnv: PropTypes.bool.isRequired
};
