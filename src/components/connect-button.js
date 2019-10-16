import React from "react";
import PropTypes from "prop-types";
import Thingy from "thingy52_web_bluetooth";
import Button from "@material-ui/core/Button";

class ConnectButton extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }

  async start() {
    if (!this.props.connected) {
      try {
        const thingy = new Thingy({logEnabled: false});
        window.thingy = thingy;
        const connected = await window.thingy.connect();
        if (connected) {
          this.props.onConnectionEvent(true);
        }
      } catch (e) {
        this.props.notifyError(e);
      }
    } else {
      this.props.onConnectionEvent(false);
      this.props.disconnect();
    }
  }

  render() {
    const text = this.props.connected
      ? "Rozłącz"
      : "Połącz z urządzeniem";

    return (
      <div>
        <Button
          id="connectButton"
          backgroundColor="transparent"
          className="buttonRoot"
          fullWidth={true}
          onClick={() => this.start()}
        >
          {text}
        </Button>
      </div>
    );
  }
}

ConnectButton.propTypes = {
  connected: PropTypes.bool,
  disconnect: PropTypes.func.isRequired,
  onConnectionEvent: PropTypes.func.isRequired,
  notifyError: PropTypes.func,
};

export default ConnectButton;
