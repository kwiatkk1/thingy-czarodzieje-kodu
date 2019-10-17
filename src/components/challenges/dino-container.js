import {connect} from "react-redux";
import {toggleFeature} from "module/thingy/thingy-actions";

import Dino from "components/challenges/dino";

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
)(Dino);
