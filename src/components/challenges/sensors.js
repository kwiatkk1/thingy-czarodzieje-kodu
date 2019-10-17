import React, {Fragment, useEffect} from "react";

import ChallengeHeader from "components/ui/challenge-header";

export default function DinosaurGame(props) {


  useEffect(() => {
    props.onStart();
  });

  return (
    <Fragment>
      <ChallengeHeader text="Sensory" />


    </Fragment>
  );
}
