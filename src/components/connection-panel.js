import React, {Fragment, useEffect} from "react";
import ConnectButton from "./connect-button";
import Drawer from "@material-ui/core/Drawer";
import Battery from "components/ui/battery";
import PropTypes from "prop-types";
import {useSnackbar} from "notistack";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {Link as RouterLink} from "react-router-dom";

import { saveDeviceStatus } from "module/firestore/firebase";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const StatusLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/status" {...props} />
));

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1"
  },
  statusBtn: {
    alignSelf: "flex-end",
    color: "#ccc"
  },
  spacer: {
    flexGrow: 1
  }
}));

export default function ConnectionPanel(props) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    if (props.connected && props.name) {
      saveDeviceStatus(props.name, {
        battery: props.batteryLevel,
        firmware: props.firmware
      });
    }
  }, [props.connected, props.name, props.firmware, props.batteryLevel]);

  function onConnectionEvent(isConnected) {
    props.onConnectionEvent(isConnected);

    if (isConnected) {
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

  const connectButton = <ConnectButton onConnectionEvent={onConnectionEvent} disconnect={props.disconnect} notifyError={props.notifyError} connected={props.connected} />;
  const statusButton = <Button fullWidth={true} className={classes.statusBtn} component={StatusLink}>status</Button>;

  const infoBlock = props.connected && props.name && props.firmware && props.batteryLevel
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
    <div className={classes.root}>
      {infoBlock}
      {connectButton}
      <div className={classes.spacer} />
      {statusButton}
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
