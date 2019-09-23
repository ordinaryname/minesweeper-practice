const { gameOver, rl } = require('./index');

test('should be false on startup', () => {
  const isGameOver = gameOver;
  expect(isGameOver).toBe(false);
  rl.close();
});
