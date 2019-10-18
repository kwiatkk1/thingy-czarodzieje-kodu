import React, {useEffect} from "react";

import {useSnackbar} from "notistack";
import ChallengeFrame from "components/ui/challenge-frame";
import CodeEditorCard from "components/ui/code-editor-card";
import useMarkdown from "utils/use-markdown";
import docsUrl from "components/challenges/led.md";

import {CardLedView} from "components/challenges/led/panel-card";

export default function Led(props) {
  const markdownText = useMarkdown(docsUrl);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    props.onStart();
  }, [props.connected]);

  useEffect(() => {
    const isButtonDown = !!props.buttonPressed;

    if (isButtonDown && typeof window.ledOnButtonPressed === "function") {
      window.ledOnButtonPressed();
    }
  }, [props.buttonPressed]);

  function executeCode(code) {
    const { writeLedColor, writeLedMode, writeBrightness, writeCustom, led: { reading: currentState } } = props;

    // eslint-disable-next-line no-unused-vars
    function sleep(time) { return new Promise(resolve => setTimeout(resolve, time)); }

    // eslint-disable-next-line no-unused-vars
    function changeColor(color) {
      writeLedColor(color, currentState);
    }

    function changeColor(color) {
      writeLedColor(color, currentState);
    }

    // eslint-disable-next-line no-unused-vars
    function changeMode(mode) {
      writeLedMode(mode, currentState);
    }

    // eslint-disable-next-line no-unused-vars
    const changeBrightness = (value) => writeBrightness(value, currentState);

    // eslint-disable-next-line no-unused-vars
    const customColor = (red, green, blue) => writeCustom({ red, green, blue }, currentState);

    const playSample = number => {
      props.playAudio({ mode: 3, sample: number });
    };

    // eslint-disable-next-line no-unused-vars
    function onButtonPressed(callback) {
      window.ledOnButtonPressed = callback;
    }

    try {
      eval("(async () => {;\n" + code + "\n;})().catch(e => { enqueueSnackbar(\"Ups... wygląda na to, że kod jest niepoprawny :(\", { variant: \"error\", preventDuplicate: true }); })");
      enqueueSnackbar("Kod wczytany!", { variant: "success", preventDuplicate: true });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Ups... wygląda na to, że kod jest niepoprawny :(", { variant: "error", preventDuplicate: true });
    }
  }

  function handleChangeColor(event) {
    props.writeLedColor(parseInt(event.target.value, 10), props.led.reading);
  }

  function handleChangeMode(event) {
    props.writeLedMode(event.currentTarget.value, props.led.reading);
  }

  return (
    <ChallengeFrame
      headerText="Dioda LED"
      markdownText={markdownText}
      showcasePanel={<CardLedView feature={props.led} changeColor={handleChangeColor} changeMode={handleChangeMode} />}
      codePanel={<CodeEditorCard name="ledAndSound" onRun={executeCode} />}
    />
  );
}
