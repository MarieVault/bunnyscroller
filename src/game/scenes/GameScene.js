import Phaser from "phaser";
import { LEVEL, PLAYER } from "../constants";
import { Collectible } from "../objects/Collectible";
import { Hazard } from "../objects/Hazard";
import { Player } from "../objects/Player";
import { collectibleData, platformData, spikeData } from "../levelData";
import { clamp } from "../utils/helpers";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.isRunActive = true;
    this.invulnerableUntil = 0;
    this.touchState = { left: false, right: false, jump: false };
    this.touchJumpQueued = false;

    this.registry.set("lives", PLAYER.maxLives);
    this.registry.set("collectibles", 0);
    this.registry.set("collectiblesTotal", collectibleData.length);
    this.registry.set("timeLeft", LEVEL.timeLimit);
    this.registry.set("paused", false);

    this.physics.world.gravity.y = PLAYER.gravity;
    this.physics.world.setBounds(0, 0, LEVEL.worldWidth, LEVEL.worldHeight);
    this.cameras.main.setBounds(0, 0, LEVEL.worldWidth, LEVEL.worldHeight);
    this.cameras.main.setBackgroundColor("#fff8f0");

    this.add
      .tileSprite(LEVEL.worldWidth / 2, 270, LEVEL.worldWidth, 540, "bg")
      .setScrollFactor(0.15, 0.05)
      .setTint(0xffffff);

    this.platforms = this.physics.add.staticGroup();
    platformData.forEach((platform) => {
      const sprite = this.platforms
        .create(platform.x, platform.y, "platform")
        .setDisplaySize(platform.width, 48)
        .refreshBody();
      sprite.setOrigin(0.5, 0.5);
    });

    this.collectibles = this.physics.add.group({ allowGravity: false, immovable: true });
    collectibleData.forEach(({ x, y }) => {
      this.collectibles.add(new Collectible(this, x, y));
    });

    this.hazards = this.physics.add.staticGroup();
    spikeData.forEach(({ x, y, count }) => {
      for (let index = 0; index < count; index += 1) {
        this.hazards.add(new Hazard(this, x + index * 50, y));
      }
    });

    this.goal = this.physics.add.staticImage(LEVEL.goalX, 410, "goal");
    this.goal.setScale(1);
    this.goal.refreshBody();

    this.player = new Player(this, LEVEL.spawn.x, LEVEL.spawn.y);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(this.player, this.collectibles, this.collectSeal, undefined, this);
    this.physics.add.overlap(this.player, this.hazards, this.hitHazard, undefined, this);
    this.physics.add.overlap(this.player, this.goal, this.reachGoal, undefined, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      w: Phaser.Input.Keyboard.KeyCodes.W,
      p: Phaser.Input.Keyboard.KeyCodes.P,
      esc: Phaser.Input.Keyboard.KeyCodes.ESC
    });

    this.input.keyboard.on("keydown-P", () => this.togglePause());
    this.input.keyboard.on("keydown-ESC", () => this.togglePause());

    this.createTouchControls();
    this.createGoalMarker();

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(140, 90);
    this.cameras.main.setZoom(1);

    this.timerEvent = this.time.addEvent({
      delay: 250,
      loop: true,
      callback: () => {
        if (!this.isRunActive || this.scene.isPaused()) {
          return;
        }

        const nextTime = Math.max(0, this.registry.get("timeLeft") - 0.25);
        this.registry.set("timeLeft", nextTime);

        if (nextTime <= 0) {
          this.finishRun(false, "Time ran out");
        }
      }
    });
  }

  createGoalMarker() {
    const label = this.add
      .text(LEVEL.goalX - 10, 160, "GOAL", {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "24px",
        color: "#6f1d1b",
        backgroundColor: "#fff8f0"
      })
      .setPadding(10, 6)
      .setOrigin(0.5)
      .setScrollFactor(1);

    this.tweens.add({
      targets: label,
      y: label.y - 12,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });
  }

  createTouchControls() {
    const isTouchDevice =
      this.sys.game.device.input.touch || this.scale.width < 900;

    if (!isTouchDevice) {
      return;
    }

    const makeButton = (x, y, label, onPress, onRelease = onPress) => {
      const button = this.add
        .circle(x, y, 34, 0x6f1d1b, 0.22)
        .setStrokeStyle(3, 0x6f1d1b)
        .setScrollFactor(0)
        .setDepth(20)
        .setInteractive();

      const text = this.add
        .text(x, y, label, {
          fontFamily: "Trebuchet MS, Verdana, sans-serif",
          fontSize: "26px",
          color: "#6f1d1b"
        })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(21);

      button.on("pointerdown", onPress);
      button.on("pointerup", onRelease);
      button.on("pointerout", onRelease);
      button.on("pointerupoutside", onRelease);

      return { button, text };
    };

    makeButton(
      78,
      472,
      "<",
      () => {
        this.touchState.left = true;
      },
      () => {
        this.touchState.left = false;
      }
    );
    makeButton(
      156,
      472,
      ">",
      () => {
        this.touchState.right = true;
      },
      () => {
        this.touchState.right = false;
      }
    );
    makeButton(
      884,
      472,
      "^",
      () => {
        this.touchState.jump = true;
        this.touchJumpQueued = true;
      },
      () => {
        this.touchState.jump = false;
      }
    );
  }

  collectSeal(_player, collectible) {
    collectible.destroy();
    this.registry.set("collectibles", this.registry.get("collectibles") + 1);
  }

  hitHazard() {
    const now = this.time.now;
    if (!this.isRunActive || now < this.invulnerableUntil) {
      return;
    }

    this.invulnerableUntil = now + 1200;

    const remainingLives = this.registry.get("lives") - 1;
    this.registry.set("lives", remainingLives);

    this.cameras.main.shake(180, 0.006);
    this.player.setTint(0xffb5a7);
    this.time.delayedCall(180, () => this.player.clearTint());

    if (remainingLives <= 0) {
      this.finishRun(false, "You ran out of hearts");
      return;
    }

    this.player.setPosition(LEVEL.spawn.x, LEVEL.spawn.y);
    this.player.setVelocity(0, -150);
  }

  reachGoal() {
    if (!this.isRunActive) {
      return;
    }

    this.finishRun(true, "Gate reached");
  }

  togglePause() {
    if (!this.isRunActive) {
      return;
    }

    const nextState = !this.registry.get("paused");
    this.registry.set("paused", nextState);

    if (nextState) {
      this.physics.world.pause();
      this.timerEvent.paused = true;
      this.scene.get("UIScene").showPauseOverlay();
    } else {
      this.physics.world.resume();
      this.timerEvent.paused = false;
      this.scene.get("UIScene").hidePauseOverlay();
    }
  }

  finishRun(didWin, reason) {
    if (!this.isRunActive) {
      return;
    }

    this.isRunActive = false;
    this.registry.set("paused", false);
    this.scene.stop("UIScene");
    this.scene.start("GameOverScene", {
      didWin,
      reason,
      collectibles: this.registry.get("collectibles"),
      totalCollectibles: this.registry.get("collectiblesTotal"),
      timeLeft: clamp(this.registry.get("timeLeft"), 0, LEVEL.timeLimit)
    });
  }

  update(time) {
    if (!this.isRunActive || this.registry.get("paused")) {
      return;
    }

    const left = this.cursors.left.isDown || this.keys.a.isDown || this.touchState.left;
    const right = this.cursors.right.isDown || this.keys.d.isDown || this.touchState.right;
    const jumpHeld =
      this.cursors.up.isDown ||
      this.cursors.space.isDown ||
      this.keys.w.isDown ||
      this.touchState.jump;

    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.space) ||
      Phaser.Input.Keyboard.JustDown(this.keys.w) ||
      this.touchJumpQueued;

    this.player.update(
      {
        left,
        right,
        jumpHeld,
        jumpPressed
      },
      time
    );

    this.touchJumpQueued = false;

    if (this.player.y > 690) {
      this.finishRun(false, "You fell into the pit");
    }
  }
}
