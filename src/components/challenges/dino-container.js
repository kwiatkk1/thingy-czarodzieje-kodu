import {connect} from "react-redux";
import {toggleFeature, writeToSpeaker} from "module/thingy/thingy-actions";

import Dino from "components/challenges/dino";

const mapStateToProps = ({ thingy }) => {
  return ({
    connected: thingy.connected.reading,
    buttonPressed: thingy.button.reading.value,
    tap: thingy.tap.reading
  });
};

const mapDispatchToProps = (dispatch) => ({
  onStart: () => {
    dispatch(toggleFeature("button", "on"));
    dispatch(toggleFeature("tap", "on"));
  },
  onEnd: () => {
  },
  playAudio: (data) => {
    dispatch(writeToSpeaker(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dino);
