import Phaser from "phaser";

export class Collectible extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "collectible");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.setScale(0.9);
    this.setDepth(1);
  }
}
