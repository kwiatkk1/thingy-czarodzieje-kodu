import {connect} from "react-redux";
import {toggleFeature} from "module/thingy/thingy-actions";

import Sensors from "./sensors";

const mapStateToProps = ({ thingy }) => {
  return ({
    connected: thingy.connected.reading,
    temperature: thingy.temperature.reading,
    humidity: thingy.humidity.reading,
    pressure: thingy.pressure.reading,
    co2: thingy.co2.reading
  });
};

const mapDispatchToProps = (dispatch) => ({
  onStart: () => {
    dispatch(toggleFeature("temperature", "on"));
    dispatch(toggleFeature("humidity", "on"));
    dispatch(toggleFeature("pressure", "on"));
    dispatch(toggleFeature("co2", "on"));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sensors);
