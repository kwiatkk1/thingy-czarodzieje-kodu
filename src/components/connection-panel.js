import React, {Fragment} from "react";
import ConnectButton from "./connect-button";
import Drawer from "@material-ui/core/Drawer";
import Battery from "components/ui/battery";
import PropTypes from "prop-types";
import {useSnackbar} from "notistack";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";


export default function ConnectionPanel(props) {
  const { enqueueSnackbar } = useSnackbar();

  function onConnectionEvent(state) {
    props.onConnectionEvent(state);
    if (state) {
      props.readName();
      props.readFirmware();

      enqueueSnackbar("Thingy połączone!", { variant: "success"});
      props.startErrorNotification();
      props.startDisconnectNotification();
      props.startWriteNotification();
      props.startBatteryNotification();
    } else {
      enqueueSnackbar("Thingy rozłączone!");
    }
  }

  const connectButton = <ConnectButton onConnectionEvent={onConnectionEvent} disconnect={props.disconnect} notifyError={props.notifyError} connected={props.connected}/>;

  if (!props.connected) {
    return connectButton;
  }

  const infoBlock = props.name && props.firmware && props.batteryLevel
    ? (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Battery className="battery" batteryLevel={props.batteryLevel} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.name} secondary={`${props.firmware} / bateria: ${props.batteryLevel}%`} />
      </ListItem>
    )
    : null;

  return (
    <div>
      {infoBlock}
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
