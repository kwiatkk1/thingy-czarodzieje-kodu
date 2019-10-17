import React, {Fragment, useEffect} from "react";

import ChallengeHeader from "components/ui/challenge-header";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CodeEditor from "components/ui/code-editor";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
  iframeNode: {
    display: "block"
  },
}));

export default function LightAndSound(props) {
  const defaultCode = "// onGravityChange((y, x, z) => {\n" +
    "//   if (x > 5) moveRight();\n" +
    "//   if (x < -5) moveLeft();\n" +
    "//   if (y > 5) moveUp();\n" +
    "//   if (y < -5) moveDown();\n" +
    "// })";
  const editorText = localStorage.getItem("ledAndSound") || defaultCode;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    props.onStart();
  }, [props.connected]);

  useEffect(() => {
    const isButtonDown = !!props.buttonPressed;

    if (isButtonDown && typeof window.thingyOnButtonPressed === "function") {
      window.thingyOnButtonPressed();
    }
  }, [props.buttonPressed]);

  function handleCodeChange(newValue) {
    localStorage.setItem("ledAndSound", newValue);
  }

  function executeCode() {
    const code = localStorage.getItem("ledAndSound");
    const { writeLedColor } = props;

    function sleep(time) { return new Promise(resolve => setTimeout(resolve, time)); }

    function changeColor(color) {
      console.log("changeColor", color);
      writeLedColor(color, { ...props.led.reading });
    }

    function onButtonPressed(callback) {
      window.thingyOnButtonPressed = callback;
    }

    // function changeMode(event) {
    //   props.writeLedMode(event.target.value, this.state.led.reading);
    // }

    try {
      eval("(async () => {;\n" + code + "\n;})().catch(e => { enqueueSnackbar(\"Ups... wygląda na to, że kod jest niepoprawny :(\", { variant: \"error\", preventDuplicate: true }); })");
      enqueueSnackbar("Kod wczytany!", { variant: "success", preventDuplicate: true });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Ups... wygląda na to, że kod jest niepoprawny :(", { variant: "error", preventDuplicate: true });
    }
  }

  return (
    <Fragment>
      <ChallengeHeader text="Dioda LED i głośnik" />

      <Paper square>
        {JSON.stringify(props.led)}
      </Paper>

      <Card className={classes.card}>
        <CardContent>
          <CodeEditor onChange={handleCodeChange} value={editorText} />
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
