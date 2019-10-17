import {connect} from "react-redux";
import {toggleFeature} from "module/thingy/thingy-actions";

import BallGame from "components/challenges/ball-game";

const mapStateToProps = ({ thingy }) => ({
  connected: thingy.connected.reading,
  gravity: thingy.gravityvector.reading.value
});

const mapDispatchToProps = (dispatch) => ({
  onStart: () => {
    dispatch(toggleFeature("button", "on"));
    dispatch(toggleFeature("gravityvector", "on"));
  },
  onEnd: () => {
    dispatch(toggleFeature("gravityvector", "off"));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BallGame);
