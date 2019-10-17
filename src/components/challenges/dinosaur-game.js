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

export default function DinosaurGame(props) {
  const defaultCode = "// jumpStart();\n" +
    "\n" +
    "// onButtonPressed(jumpStart)\n" +
    "\n" +
    "// onTap(() => console.log('tap!'));\n" +
    "\n" +
    "// onTap(jumpStart);";
  const dinoGameText = localStorage.getItem("dinoGame") || defaultCode;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  function send(cmd) {
    document.querySelector("#trex-game-iframe").contentWindow.postMessage({ cmd });
  }

  useEffect(() => {
    props.onStart();
  });

  useEffect(() => {
    const isButtonDown = !!props.buttonPressed;

    if (isButtonDown && typeof window.thingyOnButtonPressed === "function") {
      window.thingyOnButtonPressed();
    }
  }, [props.buttonPressed]);

  useEffect(() => {
    if (typeof window.thingyOnTap === "function") {
      window.thingyOnTap();
    }
  }, [props.tapCount, props.tapDirection]);

  function handleCodeChange(newValue) {
    localStorage.setItem("dinoGame", newValue);
  }

  function executeCode() {
    const code = localStorage.getItem("dinoGame");

    function jumpStart() { send("JUMP_PRESSED"); }
    function jumpEnd() { send("JUMP_RELEADED"); }

    function onButtonPressed(callback) {
      window.thingyOnButtonPressed = callback;
    }

    function onTap(callback) {
      window.thingyOnTap = callback;
    }

    eval(code);
  }

  return (
    <Fragment>
      <ChallengeHeader text="Gra: Thingozaurus-Rex" />

      <Paper square>
        <iframe src="/trex-game/dino.game.html" id="trex-game-iframe" width="100%" height={320} frameBorder={0} className={classes.iframeNode} />
      </Paper>

      <Card className={classes.card}>
        <CardContent>
          <CodeEditor onChange={handleCodeChange} value={dinoGameText} />
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
