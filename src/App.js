import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';

import Header from "./components/header";
import Menu from "./components/menu";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import ConnectButton from "./components/connect-button";
import Battery from "./components/battery";
import {Switch, Route} from "react-router-dom";

import UiContainer from "./containers/ui-container"

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));


export default function App(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();


  function onConnectionEvent(state) {
    props.onConnectionEvent(state);
    if (state) {
      props.readName();
      props.readFirmware();

      enqueueSnackbar("Thingy connected");
      props.startErrorNotification();
      props.startDisconnectNotification();
      props.startWriteNotification();
      props.startBatteryNotification();
    } else {
      enqueueSnackbar("Thingy disconnected");
    }
  }

  const battery = props.connected
      ? <Battery className="battery" batteryLevel={props.batteryLevel}/>
      : null;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}><Header className={classes.appBar} /></AppBar>
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
          <Menu />

          {battery}
          <ConnectButton onConnectionEvent={onConnectionEvent} disconnect={props.disconnect} notifyError={props.notifyError} connected={props.connected}/>

        </Drawer>
          <main className={classes.content}>
            <Switch>
              <Route exact path="/led" component={UiContainer} />
            </Switch>
          </main>
      </div>
  );
}

App.propTypes = {
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