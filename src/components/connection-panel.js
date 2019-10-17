import React, {Fragment} from "react";
import ConnectButton from "./connect-button";
import Drawer from "@material-ui/core/Drawer";
import Battery from "components/ui/battery";
import PropTypes from "prop-types";
import {useSnackbar} from "notistack";


export default function ConnectionPanel(props) {
  const { enqueueSnackbar } = useSnackbar();

  function onConnectionEvent(state) {
    props.onConnectionEvent(state);
    if (state) {
      props.readName();
      props.readFirmware();

      enqueueSnackbar("Thingy połączone!");
      props.startErrorNotification();
      props.startDisconnectNotification();
      props.startWriteNotification();
      props.startBatteryNotification();
    } else {
      enqueueSnackbar("Thingy rozłączone!");
    }
  }

  const connectButton = <ConnectButton onConnectionEvent={onConnectionEvent} disconnect={props.disconnect} notifyError={props.notifyError} connected={props.connected}/>;

  const battery = props.connected
    ? <Battery className="battery" batteryLevel={props.batteryLevel}/>
    : null;

  if (!props.connected) {
    return connectButton;
  }

  return (
    <div>
      {props.name} ({props.firmware}) {battery}
      {connectButton}
    </div>
  );
}

ConnectionPanel.propTypes = {
  name: PropTypes.string,
  notification: PropTypes.object,
  connected: PropTypes.bool,
  batteryLevel: PropTypes.number,
  onConnectionEvent: PropTypes.func,
  readName: PropTypes.func,
  readFirmware: PropTypes.func,
  startErrorNotification: PropTypes.func,
  startWriteNotification: PropTypes.func,
  startBatteryNotification: PropTypes.func,
  startDisconnectNotification: PropTypes.func,
  notifyError: PropTypes.func,
  disconnect: PropTypes.func,
  firmware: PropTypes.string,
};
