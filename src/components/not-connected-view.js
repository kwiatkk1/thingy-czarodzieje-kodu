import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import BluetoothDisabledIcon from "@material-ui/icons/BluetoothDisabled";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "80vh"
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  }
}));

export default function NotConnectedView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.message}>
        <div className={classes.icon}>
          <BluetoothDisabledIcon />
        </div>
        <Typography variant="h5">
          Ups, Twoje Thingy nie jest połączone!
        </Typography>
      </div>
    </div>
  );
}

