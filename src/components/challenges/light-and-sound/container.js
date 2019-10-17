import {connect} from "react-redux";
import {readFeature, writeFeature} from "module/thingy/thingy-actions";

import {colorToRgb, rgbToColor} from "utils/colorConverter";

import Lesson from './index';

const mapStateToProps = ({ thingy }) => {
  return ({
    led: thingy.led,
  });
};

const mapDispatchToProps = (dispatch) => ({
  startUiFeatures: () => {
    dispatch(readFeature("led"));
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
  },
  writeLedMode: (mode, led) => {
    let color;
    if (led.mode === 1) {
      color = rgbToColor({red: led.r, green: led.g, blue: led.b});
    } else {
      color = led.color || 6;
    }
    const delay = led.delay || 1000;
    const intensity = led.intensity || 20;
    const rgbConvertedColor = colorToRgb(color);
    const red = rgbConvertedColor.red;
    const green = rgbConvertedColor.green;
    const blue = rgbConvertedColor.blue;
    const params = {
      mode: mode,
      color: color,
      intensity: intensity,
      delay: delay,
      red: red,
      green: green,
      blue: blue,
    };
    dispatch(writeFeature("led", params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lesson);
