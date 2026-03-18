import Phaser from "phaser";

export const createInputState = () => ({
  left: false,
  right: false,
  jump: false
});

export const isJumpPressed = (cursors, keys, touchState) =>
  Boolean(
    Phaser.Input.Keyboard.JustDown(cursors.up) ||
      Phaser.Input.Keyboard.JustDown(cursors.space) ||
      Phaser.Input.Keyboard.JustDown(keys.w) ||
      touchState.jump
  );
