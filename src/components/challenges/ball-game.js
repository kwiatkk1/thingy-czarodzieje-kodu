import React, {Fragment, useEffect} from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import CodeEditor from "components/ui/code-editor";
import ChallengeHeader from "components/ui/challenge-header";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
  iframeNode: {
    display: "block"
  },
}));

export default function BallGame(props) {
  const defaultCode = "// onGravityChange((y, x, z) => {\n" +
    "//   if (x > 5) moveRight();\n" +
    "//   if (x < -5) moveLeft();\n" +
    "//   if (y > 5) moveUp();\n" +
    "//   if (y < -5) moveDown();\n" +
    "// })";
  const ballGameText = localStorage.getItem("ballGame") || defaultCode;

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  function send(cmd) {
    document.querySelector("#trex-game-iframe").contentWindow.postMessage({ cmd });
  }

  useEffect(() => {
    if (props.connected) props.onStart();
    return () => { if (props.connected) props.onEnd(); };
  }, [props.connected]);

  useEffect(() => {
    const { x, y, z } = props.gravity;

    if (typeof window.thingyOnGravityChange === "function") {
      window.thingyOnGravityChange(x, y, z);
    }
  }, [props.gravity]);

  function handleCodeChange(newValue) {
    localStorage.setItem("ballGame", newValue);
  }

  function executeCode() {
    const code = localStorage.getItem("ballGame");

    function moveRight() { send("MOVE_RIGHT"); }
    function moveLeft() { send("MOVE_LEFT"); }
    function moveUp() { send("MOVE_UP"); }
    function moveDown() { send("MOVE_DOWN"); }

    function onGravityChange(callback) {
      window.thingyOnGravityChange = callback;
    }

    try {
      eval(code);
      enqueueSnackbar("Kod wczytany!", { variant: "success", preventDuplicate: true });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Ups... wygląda na to, że kod jest niepoprawny :(", { variant: "error", preventDuplicate: true });
    }
  }

  return (
    <Fragment>
      <ChallengeHeader text="Gra: Kulka-Thingulka" />

      <Paper square>
        <iframe src="/ball-game/index.html" id="trex-game-iframe" width="100%" height={320} frameBorder={0} className={classes.iframeNode} />
      </Paper>

      <Card className={classes.card}>
        <CardContent>
          <CodeEditor onChange={handleCodeChange} value={ballGameText} />
        </CardContent>
        <CardActions>
          <Button onClick={executeCode} size="small" variant="contained" color="primary">
            Wykonaj
          </Button>
          <Button size="small" color="primary">
            Wyczyśc
          </Button>
        </CardActions>
      </Card>

    </Fragment>
  );
}
