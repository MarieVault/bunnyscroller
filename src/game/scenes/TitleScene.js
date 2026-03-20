import Phaser from "phaser";
import { COLORS, GAME_HEIGHT, GAME_WIDTH } from "../constants";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.image(width / 2, height / 2, "bg").setDisplaySize(width, height);
    this.add.rectangle(width / 2, height / 2, width - 80, height - 80, COLORS.paper, 0.82)
      .setStrokeStyle(4, COLORS.ink);

    this.add
      .text(width / 2, 112, "Bunny Bound", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "52px",
        fontStyle: "bold",
        color: "#6f1d1b"
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 164, "A sketchbook sprint to the carrot gate", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "20px",
        color: "#8c3a31"
      })
      .setOrigin(0.5);

    this.add.image(width / 2, 250, "playerIdle").setScale(0.3);

    this.add
      .text(width / 2, 338, "Move: Arrow Keys / A D\nJump: Space / Up / W\nJump again in air for a double jump\nCollect seals, dodge spikes, reach the gate", {
        align: "center",
        lineSpacing: 12,
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "21px",
        color: "#6f1d1b"
      })
      .setOrigin(0.5);

    const startButton = this.createButton(width / 2, 438, "Start Game", () => {
      this.scene.start("GameScene");
      this.scene.launch("UIScene");
    });

    this.add
      .text(width / 2, 490, "Tap start on mobile. Runtime target: 1-3 minutes.", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "16px",
        color: "#8c3a31"
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => startButton.emit("pointerdown"));
    this.input.keyboard.once("keydown-ENTER", () => startButton.emit("pointerdown"));
  }

  createButton(x, y, label, onClick) {
    const container = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, 240, 56, COLORS.accent, 0.92).setStrokeStyle(3, COLORS.ink);
    const text = this.add
      .text(0, 0, label, {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "26px",
        fontStyle: "bold",
        color: "#fff8f0"
      })
      .setOrigin(0.5);

    container.add([bg, text]);
    container.setSize(240, 56);
    container.setInteractive({ useHandCursor: true });
    container.on("pointerover", () => bg.setFillStyle(0xa92f25, 0.95));
    container.on("pointerout", () => bg.setFillStyle(COLORS.accent, 0.92));
    container.on("pointerdown", onClick);

    return container;
  }
}
