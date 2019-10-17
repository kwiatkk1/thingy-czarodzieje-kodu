import React, {useEffect} from "react";

import CodeEditorCard from "components/ui/code-editor-card";
import GameFrame, { gameCommand } from "components/ui/game-frame";
import ChallengeFrame from "components/ui/challenge-frame";
import useMarkdown from "utils/use-markdown";

import docsUrl from "components/challenges/dino.md";
const GAME_NAME = "trex-game";

export default function Dino(props) {
  const defaultCode = "// jumpStart();\n" +
    "\n" +
    "// onButtonPressed(jumpStart)\n" +
    "\n" +
    "// onTap(() => console.log('tap!'));\n" +
    "\n" +
    "// onTap(jumpStart);";

  const markdownText = useMarkdown(docsUrl);

  const trexGameCommand = (cmd) => gameCommand(GAME_NAME, cmd);

  useEffect(() => {
    if (props.connected) props.onStart();
    return () => { if (props.connected) props.onEnd(); };
  }, [props.connected]);

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

  function executeCode(code) {
    console.log('executeCode', code)
    function jumpStart() { trexGameCommand("JUMP_PRESSED"); }
    function jumpEnd() { trexGameCommand("JUMP_RELEADED"); }

    function onButtonPressed(callback) {
      window.thingyOnButtonPressed = callback;
    }

    function onTap(callback) {
      window.thingyOnTap = callback;
    }

    eval(code);
  }

  return (
    <ChallengeFrame
      headerText="Gra: Thingozaurus-Rex"
      markdownText={markdownText}
      showcasePanel={<GameFrame id={GAME_NAME} publicPath="/trex-game/dino.game.html" />}
      codePanel={<CodeEditorCard name="dinoGame" initial={defaultCode} onRun={executeCode} />}
    />
  );
}
