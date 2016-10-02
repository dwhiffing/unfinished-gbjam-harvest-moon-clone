export default class Thing {
  constructor(game) {
    this.moving = false
    this.game = game
    this.sprite = game.add.sprite(-20, -20, 'stuff')
  }
}
