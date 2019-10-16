import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import BatteryFull from "@material-ui/icons/BatteryFull";
import Battery20 from "@material-ui/icons/Battery20";
import Battery30 from "@material-ui/icons/Battery30";
import Battery50 from "@material-ui/icons/Battery50";
import Battery60 from "@material-ui/icons/Battery60";
import Battery80 from "@material-ui/icons/Battery80";
import Battery90 from "@material-ui/icons/Battery90";

const useStyles = makeStyles({
  battery: {
    display: "flex",
    alignItems: "center"
  }
});

export default function Battery({...props}) {
  const classes = useStyles();
  const batteryIcon = batteryComponentReturner(props.batteryLevel);

  return (
    <div className={classes.battery}>
      {batteryIcon}
      {props.batteryLevel}%
    </div>
  );
}

const batteryComponentReturner = (batteryLevel) => {
  if (batteryLevel <= 20) {
    return (<Battery20/>);
  } else if (batteryLevel <= 30) {
    return (<Battery30/>);
  } else if (batteryLevel <= 50) {
    return (<Battery50/>);
  } else if (batteryLevel <= 60) {
    return (<Battery60/>);
  } else if (batteryLevel <= 80) {
    return (<Battery80/>);
  } else if (batteryLevel <= 90) {
    return (<Battery90/>);
  } else {
    return (<BatteryFull/>);
  }
};

Battery.propTypes = {
  batteryLevel: PropTypes.number,
};
