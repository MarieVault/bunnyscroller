import Phaser from "phaser";
import { PLAYER } from "../constants";

const IDLE_FRAMES = ["playerIdle", "playerIdle2", "playerIdle3", "playerIdle4"];
const RUN_FRAMES = [
  "playerRun1",
  "playerRun2",
  "playerRun3",
  "playerRun4",
  "playerRun5",
  "playerRun6"
];

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "playerIdle");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;
    this.setScale(0.13);
    this.body.setSize(150, 270);
    this.body.setOffset(132, 120);
    this.setCollideWorldBounds(false);

    this.jumpBufferTimer = -Infinity;
    this.lastGroundedAt = 0;
    this.remainingAirJumps = PLAYER.extraJumps;
  }

  update(input, time) {
    const moveDirection = Number(input.right) - Number(input.left);
    const targetVelocity = moveDirection * PLAYER.speed;
    const blend = this.body.blocked.down ? 0.24 : 0.14;

    if (moveDirection === 0) {
      this.setVelocityX(Phaser.Math.Linear(this.body.velocity.x, 0, 0.18));
    } else {
      this.setVelocityX(Phaser.Math.Linear(this.body.velocity.x, targetVelocity, blend));
      this.setFlipX(moveDirection < 0);
    }

    if (this.body.blocked.down) {
      this.lastGroundedAt = time;
      this.remainingAirJumps = PLAYER.extraJumps;
    }

    if (input.jumpPressed) {
      this.jumpBufferTimer = time;
    }

    const canUseBufferedJump = time - this.jumpBufferTimer <= PLAYER.jumpBufferMs;
    const canUseCoyote = time - this.lastGroundedAt <= PLAYER.coyoteTimeMs;

    if (canUseBufferedJump && canUseCoyote) {
      this.setVelocityY(PLAYER.jumpVelocity);
      this.jumpBufferTimer = -Infinity;
      this.lastGroundedAt = -Infinity;
      return;
    }

    if (input.jumpPressed && !this.body.blocked.down && this.remainingAirJumps > 0) {
      this.setVelocityY(PLAYER.jumpVelocity);
      this.jumpBufferTimer = -Infinity;
      this.remainingAirJumps -= 1;
    }

    if (!input.jumpHeld && this.body.velocity.y < -180) {
      this.setVelocityY(this.body.velocity.y * 0.55);
    }

    if (!this.body.blocked.down) {
      if (this.body.velocity.y < -120) {
        this.setTexture("playerJumpRise");
      } else if (this.body.velocity.y < 140) {
        this.setTexture("playerJumpMid");
      } else {
        this.setTexture("playerJumpFall");
      }
    } else if (Math.abs(this.body.velocity.x) > 35) {
      const frame = RUN_FRAMES[Math.floor(time / 90) % RUN_FRAMES.length];
      this.setTexture(frame);
    } else {
      const frame = IDLE_FRAMES[Math.floor(time / 220) % IDLE_FRAMES.length];
      this.setTexture(frame);
    }
  }
}
