let marker, panel

export default class Interface {
  constructor(game, tileSize) {
    this.game = game
    this.tileSize = tileSize
  }

  update() {
  }

  selectTile(x, y) {
    this.currentTile = this.game.gameMap.getTile(x, y)
  }
}
