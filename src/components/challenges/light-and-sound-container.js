import {connect} from "react-redux";
import {readFeature, toggleFeature, writeFeature} from "module/thingy/thingy-actions";

import {colorToRgb, rgbToColor} from "utils/colorConverter";
import Lesson from './light-and-sound.js';

const mapStateToProps = ({ thingy }) => {
  return ({
    connected: thingy.connected.reading,
    buttonPressed: thingy.button.reading.value,
    led: thingy.led,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onStart: () => {
    dispatch(readFeature("led"));
    dispatch(toggleFeature("button", "on"));
  },
  writeLedColor: (color, led) => {
    let mode;
    switch (led.mode) {
    case 0:
      mode = "off";
      break;
    case 1:
      mode = "constant";
      break;
    case 2:
      mode = "breathe";
      break;
    case 3:
      mode = "oneshot";
      break;
    default:
      mode = "breathe";
    }

    const rgbConvertedColor = colorToRgb(color);
    const red = rgbConvertedColor.red;
    const green = rgbConvertedColor.green;
    const blue = rgbConvertedColor.blue;

    const delay = led.delay || 3500;
    const params = {
      mode: mode,
      color: color,
      intensity: led.intensity,
      delay: delay,
      red: red,
      green: green,
      blue: blue,
    };

    console.log({ params });
    dispatch(writeFeature("led", params));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lesson);
