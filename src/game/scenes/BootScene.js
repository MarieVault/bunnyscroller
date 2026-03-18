import Phaser from "phaser";
import { assetMap } from "../assets";
import { COLORS, GAME_HEIGHT, GAME_WIDTH } from "../constants";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.cameras.main.setBackgroundColor(COLORS.paper);

    const progressBox = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      280,
      24,
      COLORS.panel
    );
    progressBox.setStrokeStyle(3, COLORS.ink);

    const progressBar = this.add.rectangle(
      GAME_WIDTH / 2 - 132,
      GAME_HEIGHT / 2,
      0,
      12,
      COLORS.accent
    );
    progressBar.setOrigin(0, 0.5);

    const loadingText = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, "Sketching world...", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "24px",
        color: "#6f1d1b"
      })
      .setOrigin(0.5);

    this.load.on("progress", (value) => {
      progressBar.width = 264 * value;
    });

    this.load.on("complete", () => {
      progressBox.destroy();
      progressBar.destroy();
      loadingText.destroy();
    });

    Object.entries(assetMap).forEach(([key, uri]) => {
      this.load.image(key, uri);
    });
  }

  create() {
    this.scene.start("TitleScene");
  }
}
