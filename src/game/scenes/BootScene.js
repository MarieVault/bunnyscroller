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

    Object.entries(assetMap)
      .filter(([key]) => !key.startsWith("player"))
      .forEach(([key, uri]) => {
        this.load.image(key, uri);
      });

    [
      ["playerIdle", "/assets/images/cute-girl/player-idle-1.png"],
      ["playerIdle2", "/assets/images/cute-girl/player-idle-2.png"],
      ["playerIdle3", "/assets/images/cute-girl/player-idle-3.png"],
      ["playerIdle4", "/assets/images/cute-girl/player-idle-4.png"],
      ["playerRun1", "/assets/images/cute-girl/player-run-1.png"],
      ["playerRun2", "/assets/images/cute-girl/player-run-2.png"],
      ["playerRun3", "/assets/images/cute-girl/player-run-3.png"],
      ["playerRun4", "/assets/images/cute-girl/player-run-4.png"],
      ["playerRun5", "/assets/images/cute-girl/player-run-5.png"],
      ["playerRun6", "/assets/images/cute-girl/player-run-6.png"],
      ["playerJumpRise", "/assets/images/cute-girl/player-jump-rise.png"],
      ["playerJumpMid", "/assets/images/cute-girl/player-jump-mid.png"],
      ["playerJumpFall", "/assets/images/cute-girl/player-jump-fall.png"],
      ["playerHurt", "/assets/images/cute-girl/player-hurt.png"]
    ].forEach(([key, path]) => {
      this.load.image(key, path);
    });
  }

  create() {
    this.scene.start("TitleScene");
  }
}
