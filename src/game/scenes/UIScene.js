import Phaser from "phaser";
import { COLORS } from "../constants";
import { formatTime } from "../utils/helpers";

export class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");
  }

  create() {
    this.add
      .rectangle(0, 0, this.scale.width, 74, COLORS.paper, 0.85)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setStrokeStyle(3, COLORS.ink);

    this.timerText = this.createLabel(24, 18, "TIME 0:00");
    this.livesText = this.createLabel(250, 18, "HEARTS 3");
    this.collectText = this.createLabel(470, 18, "SEALS 0/0");

    this.pauseButton = this.add
      .text(this.scale.width - 110, 16, "PAUSE", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#6f1d1b",
        backgroundColor: "#f4dfd0",
        padding: { left: 14, right: 14, top: 8, bottom: 8 }
      })
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true });

    this.pauseButton.on("pointerdown", () => {
      const gameScene = this.scene.get("GameScene");
      gameScene.togglePause();
    });

    this.pauseOverlay = this.add
      .container(this.scale.width / 2, this.scale.height / 2)
      .setDepth(50)
      .setScrollFactor(0)
      .setVisible(false);

    const overlayBg = this.add.rectangle(0, 0, 320, 160, COLORS.paper, 0.96).setStrokeStyle(4, COLORS.ink);
    const overlayText = this.add
      .text(0, -18, "Paused", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "38px",
        fontStyle: "bold",
        color: "#6f1d1b"
      })
      .setOrigin(0.5);
    const overlayHint = this.add
      .text(0, 34, "Tap pause or press P / Esc to resume", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "18px",
        color: "#8c3a31",
        align: "center"
      })
      .setOrigin(0.5);

    this.pauseOverlay.add([overlayBg, overlayText, overlayHint]);

    this.events.on("shutdown", () => {
      this.registry.events.off("changedata", this.refreshFromRegistry, this);
    });

    this.registry.events.on("changedata", this.refreshFromRegistry, this);
    this.refreshAll();
  }

  createLabel(x, y, text) {
    return this.add.text(x, y, text, {
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "24px",
      fontStyle: "bold",
      color: "#6f1d1b"
    });
  }

  refreshFromRegistry(_parent, key) {
    if (["timeLeft", "lives", "collectibles", "collectiblesTotal"].includes(key)) {
      this.refreshAll();
    }
  }

  refreshAll() {
    this.timerText.setText(`TIME ${formatTime(this.registry.get("timeLeft") ?? 0)}`);
    this.livesText.setText(`HEARTS ${this.registry.get("lives") ?? 0}`);
    this.collectText.setText(
      `SEALS ${this.registry.get("collectibles") ?? 0}/${this.registry.get("collectiblesTotal") ?? 0}`
    );
  }

  showPauseOverlay() {
    this.pauseOverlay.setVisible(true);
  }

  hidePauseOverlay() {
    this.pauseOverlay.setVisible(false);
  }
}
