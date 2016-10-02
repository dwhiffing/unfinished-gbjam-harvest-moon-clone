import Thing from './thing'

export default class GameMap {
  constructor(game, tileSize, worldSize) {
    this.game = game
    this.map = game.add.tilemap('map', tileSize, tileSize)
    this.map.addTilesetImage('tile')
    this.worldSize = worldSize
    this.groundLayer = this.map.createLayer(0)
    this.groundLayer.resizeWorld()
  }

  getTileXY(x, y) {
    return {
      x: this.groundLayer.getTileX(x),
      y: this.groundLayer.getTileY(y),
    }
  }

  getTile(x, y) {
    const tile = this.map.getTile(x, y, this.structureLayer, true)
    if (tile.index === -1) {
      return null
    }
    return tile
  }

  isOccupied({x, y}) {
    const tile = this.getTile(x, y)
    return !!tile
  }
}
