import React from "react";

import {CardButtonView, CardLedView} from "./UICards";

import PropTypes from "prop-types";
import "./styles.css";

class UI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      led: props.led,
    };

    this.changeTab = props.changeTab;
    this.changeColor = this.changeColor.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.shutdown = props.shutdown;
  }

  componentWillReceiveProps(np) {
    if (np.button !== this.state.button) {
      this.setState((ps) => ({
        ...ps,
        button: np.button,
      }));
    }

    if (np.led !== this.state.led) {
      this.setState((ps) => ({
        ...ps,
        led: np.led,
      }));
    }
  }

  componentDidMount() {
    this.props.startUiFeatures();
  }

  changeColor(event) {
    this.props.writeLedColor(parseInt(event.target.value, 10), this.state.led.reading);
  }

  changeMode(event) {
    this.props.writeLedMode(event.target.value, this.state.led.reading);
  }

  render() {
    return (
      <div className="content">
        <CardLedView feature={this.state.led} changeColor={this.changeColor} changeMode={this.changeMode}/>
      </div>
    );
  }
}

UI.propTypes = {
  button: PropTypes.object,
  led: PropTypes.object,
  changeTab: PropTypes.func,
  toggleButton: PropTypes.func,
  stopButton: PropTypes.func,
  startUiFeatures: PropTypes.func,
  writeLedColor: PropTypes.func,
  writeLedMode: PropTypes.func,
  shutdown: PropTypes.func,
};

export default UI;
