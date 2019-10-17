import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import thingyImage from "assets/thingy-product.png";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column",
    width: "100%",
    height: "80vh",
    textAlign: "center"
  },
  thingyName: {
    color: "#ccc"
  }
}));

export default function NotConnectedView() {
  const classes = useStyles();

  const thingyName = localStorage.getItem("thingyName");

  return (
    <div className={classes.root}>
      <img src={thingyImage} alt="" />
      <div className={classes.message}>
        <Typography variant="h5">
          Ups, Twoje Thingy nie jest połączone!
        </Typography>
        {
          thingyName
            ? <Typography variant="h6" className={classes.thingyName}>{thingyName}</Typography>
            : null
        }
      </div>
    </div>
  );
}
