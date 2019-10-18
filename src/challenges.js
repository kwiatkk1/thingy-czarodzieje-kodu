import LightAndSound from "components/challenges/led-container";
import DinosaurGame from "components/challenges/dino-container";
import BallGame from "components/challenges/ball-container";
import Sensors from "components/challenges/sensors-container";

export default [
  { path: "/sensors", component: Sensors, primary: "Zadanie #1", secondary: "Czujniki" },
  { path: "/lights", component: LightAndSound, primary: "Zadanie #2", secondary: "Światło i dźwięk" },
  { path: "/dino", component: DinosaurGame, primary: "Zadanie #3", secondary: "Gra: Skaczący Dinozaur" },
  { path: "/ball", component: BallGame, primary: "Zadanie #4", secondary: "Gra: Kulka" }
];
