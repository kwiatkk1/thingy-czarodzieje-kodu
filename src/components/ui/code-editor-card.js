import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import CodeEditor from "./code-editor";

export default function CodeEditorCard(props) {
  const { name, initial, onRun } = props;

  const codeString = localStorage.getItem(name) || initial || "";
  const handleCodeChange = (newValue) => localStorage.setItem(name, newValue);
  const executeCode = () => onRun(localStorage.getItem(name));

  return (
    <Card>
      <CodeEditor onChange={handleCodeChange} value={codeString} />
      <CardActions>
        <Button onClick={executeCode} size="medium" variant="contained" color="primary" startIcon={<PlayCircleOutlineIcon />}>
          Wykonaj
        </Button>
      </CardActions>
    </Card>
  );
}
