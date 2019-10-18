import React, {useEffect} from "react";

import useMarkdown from "utils/use-markdown";
import helpTextUrl from "./sensors.md";
import ChallengeFrame from "components/ui/challenge-frame";
import RealtimeChart from "components/ui/realtime-chart";

export default function Sensors(props) {
  const markdownText = useMarkdown(helpTextUrl);

  useEffect(() => {
    props.onStart();
  }, [props.connected]);

  return (
    <ChallengeFrame
      headerText="Sensory"
      markdownText={markdownText}
      showcasePanel={<div>
        Temperatura:
        <RealtimeChart data={props.temperature} />
        Wilgotność:
        <RealtimeChart data={props.humidity} />
      </div>}
    />
  );
}
