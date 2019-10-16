import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "./menu";
import Drawer from "@material-ui/core/Drawer";
import {Route, Switch} from "react-router-dom";

import NotConnectedView from "../components/not-connected-view";
import ConnectionPanel from "../components/connection-panel-container";


import LedLesson from "./lessons/02-light-and-sound/container";
import ButtonLesson from "./lessons/03-game-dinosaur/container";

import HighlightIcon from "@material-ui/icons/Highlight";

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
    padding: theme.spacing(3),
  },
}));

export default function App(props) {
  const classes = useStyles();
  const { connected: isConnected } = props;

  const menu = [
    { path: "/a", component: LedLesson, primary: "Czujniki", secondary: "Temperatura", icon: <HighlightIcon /> },
    { path: "/b", component: LedLesson, primary: "Sterowanie", secondary: "Światło i dźwięk", icon: <HighlightIcon /> },
    { path: "/c", component: ButtonLesson, primary: "Dinozaur", secondary: "Przycisk", icon: <HighlightIcon /> },
    { path: "/d", component: LedLesson, primary: "Sterowanie", secondary: "Światło i dźwięk", icon: <HighlightIcon /> }
  ];

  const router = (
    <Switch>
      {menu.map(item => <Route exact key={item.path} path={item.path} component={item.component} />)}
    </Switch>
  );

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Menu items={menu} />
        <ConnectionPanel />
      </Drawer>
      <main className={classes.content}>
        {/*{ router }*/}
        { isConnected ? router : <NotConnectedView /> }
      </main>
    </div>
  );
}

App.propTypes = {
  connected: PropTypes.bool
};
