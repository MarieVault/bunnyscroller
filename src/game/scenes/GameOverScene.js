import Phaser from "phaser";
import { COLORS, GAME_HEIGHT, GAME_WIDTH, LEVEL } from "../constants";
import { formatTime } from "../utils/helpers";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create(data) {
    const didWin = Boolean(data?.didWin);

    this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "bg").setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 620, 360, COLORS.paper, 0.95)
      .setStrokeStyle(4, COLORS.ink);

    this.add
      .text(GAME_WIDTH / 2, 132, didWin ? "Stage Clear" : "Try Again", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "50px",
        fontStyle: "bold",
        color: didWin ? "#8a281f" : "#6f1d1b"
      })
      .setOrigin(0.5);

    this.add.image(GAME_WIDTH / 2, 220, didWin ? "goal" : "playerJump").setScale(didWin ? 1 : 2);

    this.add
      .text(
        GAME_WIDTH / 2,
        304,
        `${data?.reason ?? ""}\nSeals ${data?.collectibles ?? 0}/${data?.totalCollectibles ?? 0}\nTime ${formatTime(data?.timeLeft ?? LEVEL.timeLimit)}`,
        {
          align: "center",
          lineSpacing: 10,
          fontFamily: "Trebuchet MS, Verdana, sans-serif",
          fontSize: "24px",
          color: "#6f1d1b"
        }
      )
      .setOrigin(0.5);

    this.createButton(GAME_WIDTH / 2 - 120, 430, "Restart", () => {
      this.scene.start("GameScene");
      this.scene.launch("UIScene");
    });

    this.createButton(GAME_WIDTH / 2 + 120, 430, "Title", () => {
      this.scene.start("TitleScene");
    });
  }

  createButton(x, y, label, onClick) {
    const bg = this.add.rectangle(x, y, 190, 56, COLORS.accent, 0.92).setStrokeStyle(3, COLORS.ink);
    const text = this.add
      .text(x, y, label, {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "24px",
        fontStyle: "bold",
        color: "#fff8f0"
      })
      .setOrigin(0.5);

    bg.setInteractive({ useHandCursor: true });
    bg.on("pointerover", () => bg.setFillStyle(0xa92f25, 0.95));
    bg.on("pointerout", () => bg.setFillStyle(COLORS.accent, 0.92));
    bg.on("pointerdown", onClick);
    text.setInteractive({ useHandCursor: true }).on("pointerdown", onClick);
  }
}
