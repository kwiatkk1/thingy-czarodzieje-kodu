import React from "react";
import PropTypes from "prop-types";
import Thingy from "module/thingy/api/Thingy";
import Button from "@material-ui/core/Button";
import BluetoothSearchingIcon from "@material-ui/icons/BluetoothSearching";
import BluetoothDisabledIcon from "@material-ui/icons/BluetoothDisabled";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  btIconConnect: {
    color: "#1976d2",
  },
  btIconDisconnect: {
    color: "#f00"
  }
}));

const thingy = new Thingy({ logEnabled: true });
window.thingy = thingy;

export default function ConnectButton(props) {
  const classes = useStyles();

  async function start() {
    if (!props.connected) {
      try {
        const connected = await window.thingy.connect();
        if (connected) {
          props.onConnectionEvent(true);
        }
      } catch (e) {
        props.notifyError(e);
      }
    } else {
      props.onConnectionEvent(false);
      props.disconnect();
    }
  }

  const text = props.connected
    ? "Rozłącz urządzenie"
    : "Połącz z urządzeniem";

  const icon = props.connected
    ? <BluetoothDisabledIcon className={classes.btIconDisconnect} />
    : <BluetoothSearchingIcon className={classes.btIconConnect} />;

  return (
    <div>
      <Button fullWidth={true} onClick={start} startIcon={icon}>
        {text}
      </Button>
    </div>
  );
}

ConnectButton.propTypes = {
  connected: PropTypes.bool,
  disconnect: PropTypes.func.isRequired,
  onConnectionEvent: PropTypes.func.isRequired,
  notifyError: PropTypes.func,
};
