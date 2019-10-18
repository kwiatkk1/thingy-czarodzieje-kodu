import {connect} from "react-redux";
import {toggleFeature} from "module/thingy/thingy-actions";

import Ball from "components/challenges/ball";

const mapStateToProps = ({ thingy }) => ({
  connected: thingy.connected.reading,
  buttonPressed: thingy.button.reading.value,
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
)(Ball);
