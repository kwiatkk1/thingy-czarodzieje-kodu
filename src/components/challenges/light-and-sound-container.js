import {connect} from "react-redux";
import {readFeature, writeFeature} from "module/thingy/thingy-actions";

import Lesson from './light-and-sound.js';

const mapStateToProps = ({ thingy }) => {
  return ({
    led: thingy.led,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onStart: () => {
    dispatch(readFeature("led"));
  },
  writeLedColor: (color) => {

    const params = {
      mode: "oneshot",
      color: color,
      intensity: 100
    };

    dispatch(writeFeature("led", params));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lesson);
