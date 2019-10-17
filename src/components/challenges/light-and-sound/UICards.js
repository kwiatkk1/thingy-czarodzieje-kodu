import React from "react";
import {rgbToColor} from "../../../utils/colorConverter";

export const CardLedView = (props) => (
  <div className="card_led_view">
    <div className="led_modes">
      <button type="button" className="led_mode_button button_blue" value="constant" disabled={props.feature.reading.mode === 1} onClick={props.changeMode}>Stałe</button>
      <button type="button" className="led_mode_button button_blue" value="breathe" disabled={props.feature.reading.mode === 2} onClick={props.changeMode}>Pulsujące</button>
      <button type="button" className="led_mode_button button_blue" value="oneshot" disabled={props.feature.reading.mode === 3} onClick={props.changeMode}>Jednorazowe</button>
      <button type="button" className="led_mode_button button_blue" value="off" disabled={props.feature.reading.mode === 0} onClick={props.changeMode}>Wyłącz</button>
    </div>
    <div className="led_colorpicker">
      <div>
        <button type="button" className="button red" value="1" disabled={props.feature.reading.mode === 0 || (props.feature.reading.mode === 1 && rgbToColor({red: props.feature.reading.r, green: props.feature.reading.g, blue: props.feature.reading.b}) === 1) || ([2, 3].includes(props.feature.reading.mode) && props.feature.reading.color === 1)} onClick={props.changeColor}></button>
        <button type="button" className="button green" value="2" disabled={props.feature.reading.mode === 0 || (props.feature.reading.mode === 1 && rgbToColor({red: props.feature.reading.r, green: props.feature.reading.g, blue: props.feature.reading.b}) === 2) || ([2, 3].includes(props.feature.reading.mode) && props.feature.reading.color === 2)} onClick={props.changeColor}></button>
        <button type="button" className="button yellow" value="3" disabled={props.feature.reading.mode === 0 || (props.feature.reading.mode === 1 && rgbToColor({red: props.feature.reading.r, green: props.feature.reading.g, blue: props.feature.reading.b}) === 3) || ([2, 3].includes(props.feature.reading.mode) && props.feature.reading.color === 3)} onClick={props.changeColor}></button>
        <button type="button" className="button blue" value="4" disabled={props.feature.reading.mode === 0 || (props.feature.reading.mode === 1 && rgbToColor({red: props.feature.reading.r, green: props.feature.reading.g, blue: props.feature.reading.b}) === 4) || ([2, 3].includes(props.feature.reading.mode) && props.feature.reading.color === 4)} onClick={props.changeColor}></button>
      </div>
      <div>
        <button className="button purple" value="5" disabled={props.feature.reading.mode === 0 || (props.feature.reading.mode === 1 && rgbToColor({red: props.feature.reading.r, green: props.feature.reading.g, blue: props.feature.reading.b}) === 5) || ([2, 3].includes(props.feature.reading.mode) && props.feature.reading.color === 5)} onClick={props.changeColor}></button>
        <button className="button cyan" value="6" disabled={props.feature.reading.mode === 0 || (props.feature.reading.mode === 1 && rgbToColor({red: props.feature.reading.r, green: props.feature.reading.g, blue: props.feature.reading.b}) === 6) || ([2, 3].includes(props.feature.reading.mode) && props.feature.reading.color === 6)} onClick={props.changeColor}></button>
        <button className="button white" value="7" disabled={props.feature.reading.mode === 0 || (props.feature.reading.mode === 1 && rgbToColor({red: props.feature.reading.r, green: props.feature.reading.g, blue: props.feature.reading.b}) === 7 || ([2, 3].includes(props.feature.reading.mode) && props.feature.reading.color === 7))} onClick={props.changeColor}></button>
      </div>
    </div>
  </div>
);
