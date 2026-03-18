import Phaser from "phaser";
import { gameConfig } from "./game/config";
import "./styles.css";

window.addEventListener("load", () => {
  new Phaser.Game(gameConfig);
});
