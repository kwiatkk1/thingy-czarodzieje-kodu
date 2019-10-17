import React from "react";
import PropTypes from "prop-types";

import BatteryFull from "@material-ui/icons/BatteryFull";
import Battery20 from "@material-ui/icons/Battery20";
import Battery30 from "@material-ui/icons/Battery30";
import Battery50 from "@material-ui/icons/Battery50";
import Battery60 from "@material-ui/icons/Battery60";
import Battery80 from "@material-ui/icons/Battery80";
import Battery90 from "@material-ui/icons/Battery90";


export default function Battery(props) {
  return getBatteryIconFor(props.batteryLevel);
}

const getBatteryIconFor = (batteryLevel) => {
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
