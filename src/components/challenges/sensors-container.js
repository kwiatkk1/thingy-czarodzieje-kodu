import {connect} from "react-redux";
import {toggleFeature} from "module/thingy/thingy-actions";

import Sensors from "./sensors";

const mapStateToProps = ({ thingy }) => {
  return ({
    connected: thingy.connected.reading,
    temperature: thingy.temperature.reading,
    humidity: thingy.humidity.reading
  });
};

const mapDispatchToProps = (dispatch) => ({
  onStart: () => {
    dispatch(toggleFeature("temperature", "on"));
    dispatch(toggleFeature("humidity", "on"));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sensors);
