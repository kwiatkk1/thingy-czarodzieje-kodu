import React, {useEffect} from "react";
import {useSnackbar} from "notistack";

import CodeEditorCard from "components/ui/code-editor-card";
import GameFrame, { gameCommand } from "components/ui/game-frame";
import ChallengeFrame from "components/ui/challenge-frame";
import useMarkdown from "utils/use-markdown";
import docsUrl from "components/challenges/ball.md";

const GAME_NAME = "ball-game";

export default function Ball(props) {
  const defaultCode = "// onGravityChange((y, x, z) => {\n" +
    "//   if (x > 5) moveRight();\n" +
    "//   if (x < -5) moveLeft();\n" +
    "//   if (y > 5) moveUp();\n" +
    "//   if (y < -5) moveDown();\n" +
    "// })";

  const markdownText = useMarkdown(docsUrl);
  const { enqueueSnackbar } = useSnackbar();

  const dinoGameCommand = (cmd) => gameCommand(GAME_NAME, cmd);

  useEffect(() => {
    if (props.connected) {props.onStart();}
    return () => { if (props.connected) {props.onEnd();} };
  }, [props.connected]);

  useEffect(() => {
    const { x, y, z } = props.gravity;

    if (typeof window.thingyOnGravityChange === "function") {
      window.thingyOnGravityChange(x, y, z);
    }
  }, [props.gravity]);

  function executeCode(code) {

    function moveRight() { dinoGameCommand("MOVE_RIGHT"); }
    function moveLeft() { dinoGameCommand("MOVE_LEFT"); }
    function moveUp() { dinoGameCommand("MOVE_UP"); }
    function moveDown() { dinoGameCommand("MOVE_DOWN"); }

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
    <ChallengeFrame
      headerText="Gra: Kulka-Thingulka"
      markdownText={markdownText}
      showcasePanel={<GameFrame id={GAME_NAME} publicPath="/ball-game/index.html" />}
      codePanel={<CodeEditorCard name="ballGame" initial={defaultCode} onRun={executeCode} />}
    />
  );
}
