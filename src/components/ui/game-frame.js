import React from "react";
import {pathPrefix} from "../../../package.json";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  iframeNode: {
    display: "block"
  },
}));

export function gameCommand(id, cmd) {
  document.getElementById(id).contentWindow.postMessage({ cmd });
}

export default function GameFrame(props) {
  const { id, publicPath } = props;
  const iframeSrc = (window.location.hostname !== "localhost" ? pathPrefix : "") + publicPath;
  const classes = useStyles();

  return (
    <iframe src={iframeSrc} id={id} width="100%" height={320} frameBorder={0} className={classes.iframeNode} />
  );
}
