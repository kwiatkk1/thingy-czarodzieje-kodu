import React, {useEffect} from "react";

import {useSnackbar} from "notistack";
import ChallengeFrame from "components/ui/challenge-frame";
import CodeEditorCard from "components/ui/code-editor-card";
import useMarkdown from "utils/use-markdown";
import docsUrl from "components/challenges/led.md";

export default function Led(props) {
  const defaultCode = "// onGravityChange((y, x, z) => {\n" +
    "//   if (x > 5) moveRight();\n" +
    "//   if (x < -5) moveLeft();\n" +
    "//   if (y > 5) moveUp();\n" +
    "//   if (y < -5) moveDown();\n" +
    "// })";

  const markdownText = useMarkdown(docsUrl);
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

  function executeCode(code) {
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
    <ChallengeFrame
      headerText="Dioda LED i głośnik"
      markdownText={markdownText}
      showcasePanel={<div>{JSON.stringify(props.led)}</div>}
      codePanel={<CodeEditorCard name="ledAndSound" initial={defaultCode} onRun={executeCode} />}
    />
  );
}
