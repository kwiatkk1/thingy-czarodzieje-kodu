import React from "react";

import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: theme.spacing(1),
  },
}));

export default function ChallengeHeader(props) {
  const classes = useStyles();

  return (
    <AppBar position="static" color="secondary" className={classes.toolbar}>
      <Toolbar>
        <Typography variant="h5">
          {props.text}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
