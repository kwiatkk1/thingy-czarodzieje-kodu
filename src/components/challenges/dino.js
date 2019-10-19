import React, {useEffect} from "react";

import CodeEditorCard from "components/ui/code-editor-card";
import GameFrame, { gameCommand } from "components/ui/game-frame";
import ChallengeFrame from "components/ui/challenge-frame";
import useMarkdown from "utils/use-markdown";

import docsUrl from "components/challenges/dino.md";
import {useSnackbar} from "notistack";
const GAME_NAME = "trex-game";

export default function Dino(props) {
  const markdownText = useMarkdown(docsUrl);
  const { enqueueSnackbar } = useSnackbar();

  const trexGameCommand = (cmd) => gameCommand(GAME_NAME, cmd);

  useEffect(() => {
    if (props.connected) props.onStart();
    return () => { if (props.connected) props.onEnd(); };
  }, [props.connected]);

  useEffect(() => {
    const isButtonDown = !!props.buttonPressed;

    if (isButtonDown && typeof window.dinoOnButtonPressed === "function") {
      window.dinoOnButtonPressed();
    }
  }, [props.buttonPressed]);

  useEffect(() => {
    if (typeof window.dinoOnTap === "function") {
      window.dinoOnTap();
    }
  }, [props.tap]);

  function executeCode(code) {
    function jumpStart() { trexGameCommand("JUMP_PRESSED"); }
    function jumpEnd() { trexGameCommand("JUMP_RELEADED"); }

    function onButtonPressed(callback) {
      window.dinoOnButtonPressed = callback;
    }

    function onTap(callback) {
      window.dinoOnTap = callback;
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
    <ChallengeFrame
      headerText="Gra: Thingozaurus-Rex"
      markdownText={markdownText}
      showcasePanel={<GameFrame id={GAME_NAME} publicPath="/trex-game/dino.game.html" />}
      codePanel={<CodeEditorCard name="dinoGame" onRun={executeCode} />}
    />
  );
}
