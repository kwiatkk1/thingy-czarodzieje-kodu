import React, {useEffect} from "react";
import {useSnackbar} from "notistack";

import CodeEditorCard from "components/ui/code-editor-card";
import GameFrame, { gameCommand } from "components/ui/game-frame";
import ChallengeFrame from "components/ui/challenge-frame";
import useMarkdown from "utils/use-markdown";
import docsUrl from "components/challenges/ball.md";

const GAME_NAME = "ball-game";

export default function Ball(props) {
  const markdownText = useMarkdown(docsUrl);
  const { enqueueSnackbar } = useSnackbar();

  const dinoGameCommand = (cmd, options) => gameCommand(GAME_NAME, cmd, options);

  useEffect(() => {
    if (props.connected) {props.onStart();}
    return () => { if (props.connected) {props.onEnd();} };
  }, [props.connected]);

  useEffect(() => {
    const isButtonDown = !!props.buttonPressed;

    window.isButtonDown = isButtonDown;

    if (isButtonDown) {
      if (typeof window.thingyOnButtonPressed === "function") {
        window.thingyOnButtonPressed();
      }
    }
  }, [props.buttonPressed]);

  useEffect(() => {
    const { x, y, z } = props.gravity;

    if (typeof window.ballOnGravityChange === "function") {
      window.ballOnGravityChange(x, y, z);
    }
  }, [props.gravity]);

  function executeCode(code) {

    function moveRight(value) { dinoGameCommand("MOVE_RIGHT", { value }); }
    function moveLeft(value) { dinoGameCommand("MOVE_LEFT", { value }); }
    function moveUp(value) { dinoGameCommand("MOVE_UP", { value }); }
    function moveDown(value) { dinoGameCommand("MOVE_DOWN", { value }); }

    function onGravityChange(callback) {
      window.ballOnGravityChange = callback;
    }

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

    try {
      eval(code);
      enqueueSnackbar("Kod wczytany!", { variant: "success", preventDuplicate: true });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Ups... wygląda na to, że kod jest niepoprawny :(", { variant: "error", preventDuplicate: true });
    }
  }

  return (
    <ChallengeFrame
      headerText="Gra: Kulka-Thingulka"
      markdownText={markdownText}
      showcasePanel={<GameFrame id={GAME_NAME} publicPath="/ball-game/index.html" />}
      codePanel={<CodeEditorCard name="ballGame" onRun={executeCode} />}
    />
  );
}
