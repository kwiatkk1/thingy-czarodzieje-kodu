import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import {makeStyles} from "@material-ui/core";

import CodeEditor from "./code-editor";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  button: {
    borderRadius: 0
  }
}));

export default function CodeEditorCard(props) {
  const { name, initial, onRun } = props;
  const classes = useStyles();

  const codeString = localStorage.getItem(name) || initial || "";
  const handleCodeChange = (newValue) => localStorage.setItem(name, newValue);
  const executeCode = () => onRun(localStorage.getItem(name));

  return (
    <div className={classes.root}>
      <CodeEditor onChange={handleCodeChange} value={codeString} />
      <Button onClick={executeCode} className={classes.button} fullWidth={true} size="large" variant="contained" color="primary" startIcon={<PlayCircleOutlineIcon />}>
        Wykonaj
      </Button>
    </div>
  );
}
