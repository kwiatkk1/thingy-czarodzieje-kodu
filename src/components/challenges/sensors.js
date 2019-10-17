import React from "react";

import useMarkdown from "utils/use-markdown";
import helpTextUrl from "./sensors.md";
import ChallengeFrame from "components/ui/challenge-frame";

export default function DinosaurGame() {
  const markdownText = useMarkdown(helpTextUrl);

  return (
    <ChallengeFrame
      headerText="Sensory"
      markdownText={markdownText}
      showcasePanel={<div>...</div>}
    />
  );
}
