import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "components/ui/menu";
import Drawer from "@material-ui/core/Drawer";
import {Route, Switch} from "react-router-dom";

import NotConnectedView from "../components/not-connected-view";
import ConnectionPanel from "../components/connection-panel-container";
import StatusView from "components/status-view";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.darker,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

export default function App(props) {
  const classes = useStyles();
  const { isConnected, challenges } = props;

  const router = (
    <Switch>
      <Route exact path="/status" component={StatusView} />
      {
        isConnected
          ? challenges.map(item => <Route exact key={item.path} path={item.path} component={item.component} />)
          : <Route path="*" component={NotConnectedView} />
      }
    </Switch>
  );

  return (
    <div className={classes.root}>
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <Menu items={challenges} />
        <ConnectionPanel />
      </Drawer>
      <main className={classes.content}>
        {router}
      </main>
    </div>
  );
}

App.propTypes = {
  isConnected: PropTypes.bool,
  challenges: PropTypes.array
};
