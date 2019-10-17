import {connect} from "react-redux";
import {toggleFeature} from "module/thingy/thingy-actions";

import DinosaurGame from "components/challenges/dinosaur-game";

const mapStateToProps = ({ thingy }) => {
  return ({
    connected: thingy.connected.reading,
    buttonPressed: thingy.button.reading.value,
    tapDirection: thingy.tap.reading.direction,
    tapCount: thingy.tap.reading.count
  });
};

const mapDispatchToProps = (dispatch) => ({
  onStart: () => {
    dispatch(toggleFeature("button", "on"));
    dispatch(toggleFeature("tap", "on"));
  },
  onEnd: () => {
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DinosaurGame);
