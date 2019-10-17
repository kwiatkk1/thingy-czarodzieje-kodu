import LightAndSound from "components/challenges/light-and-sound-container";
import DinosaurGame from "components/challenges/dinosaur-game-container";
import BallGame from "components/challenges/ball-game-container";
import Sensors from "components/challenges/sensors-container";

export default [
  { path: "/sensors", component: Sensors, primary: "Zadanie #01", secondary: "Czujniki" },
  { path: "/lights", component: LightAndSound, primary: "Zadanie #02", secondary: "Światło i dźwięk" },
  { path: "/dino", component: DinosaurGame, primary: "Zadanie #03", secondary: "Gra: Skaczący Dinozaur" },
  { path: "/ball", component: BallGame, primary: "Zadanie #04", secondary: "Gra: Kulka" }
];
