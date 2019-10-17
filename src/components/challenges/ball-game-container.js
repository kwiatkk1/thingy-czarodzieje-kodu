import {connect} from "react-redux";
import {toggleFeature} from "module/thingy/thingy-actions";

import BallGame from "components/challenges/ball-game";

const mapStateToProps = ({ thingy }) => ({
  gravity: thingy.gravityvector.reading.value
});

const mapDispatchToProps = (dispatch) => ({
  onStart: () => {
    dispatch(toggleFeature("button", "on"));
    dispatch(toggleFeature("gravityvector", "on"));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BallGame);
