import {connect} from "react-redux";
import {readFeature, toggleFeature, writeFeature} from "module/thingy/thingy-actions";

import {colorToRgb, rgbToColor} from "utils/colorConverter";
import Lesson from "components/challenges/led.js";
import {number} from "prop-types";

const mapStateToProps = ({ thingy }) => {
  return ({
    connected: thingy.connected.reading,
    buttonPressed: thingy.button.reading.value,
    led: thingy.led,
  });
};

const getModeName = (number) => {
  return ["off", "constant", "breathe", "oneshot"][number] || "breathe";
}

const mapDispatchToProps = (dispatch) => ({
  onStart: () => {
    dispatch(readFeature("led"));
    dispatch(toggleFeature("button", "on"));
  },
  writeLedColor: (color, led) => {
    const mode = getModeName(led.mode);
    const rgbConvertedColor = colorToRgb(color);

    const delay = led.delay || 3500;
    const params = {
      mode: mode,
      color: color,
      intensity: led.intensity,
      delay: delay,
      ...rgbConvertedColor
    };

    dispatch(writeFeature("led", params));
  },
  writeBrightness: (value = 20, led) => {
    const mode = getModeName(led.mode);
    let color;
    if (led.mode === 1) {
      color = rgbToColor({red: led.r, green: led.g, blue: led.b});
    } else {
      color = led.color || 6;
    }
    const delay = led.delay || 1000;
    const rgbConvertedColor = colorToRgb(color);

    const params = {
      mode: mode,
      color: color,
      intensity: value,
      delay: delay,
      ...rgbConvertedColor
    };
    dispatch(writeFeature("led", params));
  },
  writeLedMode: (mode, led) => {
    console.log('writeLedMode', mode, led);
    let color;
    if (led.mode === 1) {
      color = rgbToColor({red: led.r, green: led.g, blue: led.b});
    } else {
      color = led.color || 6;
    }
    const delay = led.delay || 1000;
    const intensity = led.intensity || 20;
    const rgbConvertedColor = colorToRgb(color);

    const params = {
      mode: mode,
      color: color,
      intensity: intensity,
      delay: delay,
      ...rgbConvertedColor
    };
    dispatch(writeFeature("led", params));
  },
  writeCustom: ({ red, green, blue }, led) => {
    const mode = "constant";
    const color = rgbToColor({red, green, blue});
    const delay = led.delay || 1000;
    const intensity = led.intensity || 20;

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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lesson);
