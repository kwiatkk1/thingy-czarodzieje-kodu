import React from "react";
import {rgbToColor} from "utils/colorConverter";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import "./styles.css";

export const CardLedView = (props) => {
  const { changeMode, changeColor } = props;
  const { mode, color: colorRead, r: red, g: green, b: blue} = props.feature.reading;
  const colorNumber = rgbToColor({ red, green, blue });

  const isConstantMode = mode === 1;
  const isBreatheMode = mode === 2;
  const isOneshotMode = mode === 3;
  const isOffMode = mode === 0;

  return (
    <div className="card_led_view">
      <div className="led_modes">
        <ButtonGroup fullWidth size="small">
          <Button type="button" value="constant" color={isConstantMode ? "primary" : ""} disabled={isConstantMode} onClick={changeMode}>Stałe</Button>
          <Button type="button" value="breathe" color={isBreatheMode ? "primary" : ""} disabled={isBreatheMode} onClick={changeMode}>Pulsujące</Button>
          <Button type="button" value="oneshot" color={isOneshotMode ? "primary" : ""} disabled={isOneshotMode} onClick={changeMode}>Jednorazowe</Button>
          <Button type="button" value="off" color={mode === 4 ? "primary" : ""} disabled={isOffMode} onClick={changeMode}>Wyłącz</Button>
        </ButtonGroup>
      </div>
      <div className="led_colorpicker">
        <div>
          <button type="button" className="button red" value="1" disabled={isOffMode || (isConstantMode && colorNumber === 1) || ([2, 3].includes(mode) && colorRead === 1)} onClick={changeColor}></button>
          <button type="button" className="button green" value="2" disabled={isOffMode || (isConstantMode && colorNumber === 2) || ([2, 3].includes(mode) && colorRead === 2)} onClick={changeColor}></button>
          <button type="button" className="button yellow" value="3" disabled={isOffMode || (isConstantMode && colorNumber === 3) || ([2, 3].includes(mode) && colorRead === 3)} onClick={changeColor}></button>
          <button type="button" className="button blue" value="4" disabled={isOffMode || (isConstantMode && colorNumber === 4) || ([2, 3].includes(mode) && colorRead === 4)} onClick={changeColor}></button>
        </div>
        <div>
          <button className="button purple" value="5" disabled={isOffMode || (isConstantMode && colorNumber === 5) || ([2, 3].includes(mode) && colorRead === 5)} onClick={changeColor}></button>
          <button className="button cyan" value="6" disabled={isOffMode || (isConstantMode && colorNumber === 6) || ([2, 3].includes(mode) && colorRead === 6)} onClick={changeColor}></button>
          <button className="button white" value="7" disabled={isOffMode || (isConstantMode && colorNumber === 7 || ([2, 3].includes(mode) && colorRead === 7))} onClick={changeColor}></button>
        </div>
      </div>
    </div>
  );
};
