export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;

export const COLORS = {
  ink: 0x6f1d1b,
  accent: 0xc63d2f,
  paper: 0xfff8f0,
  panel: 0xf4dfd0,
  soft: 0xd9b8a4
};

export const PLAYER = {
  speed: 230,
  jumpVelocity: -430,
  gravity: 1100,
  coyoteTimeMs: 120,
  jumpBufferMs: 140,
  extraJumps: 1,
  maxLives: 3
};

export const LEVEL = {
  timeLimit: 95,
  worldWidth: 3520,
  worldHeight: 960,
  goalX: 3290,
  spawn: { x: 120, y: 420 }
};
