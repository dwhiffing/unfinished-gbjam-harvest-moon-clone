export default class GameMap {
  constructor(game, tileSize, worldSize) {
    this.game = game
    this.map = game.add.tilemap(null, tileSize, tileSize)
    this.map.addTilesetImage('tile')
    this.worldSize = worldSize

    this.groundLayer = this.map.create('level1', worldSize, worldSize, tileSize, tileSize)
    this.groundLayer.resizeWorld()

    this.map.fill(0, 0, 0, worldSize, worldSize, this.groundLayer)
    this.createGrid()
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

  createGrid(includeQueued=true) {
    let matrix = []
    this.map.forEach((t) => {
      if (typeof t.index === 'undefined') return
      if (!matrix[t.y]) {
        matrix[t.y] = []
      }
      const walkable  = t.index === 6 || t.index === 7
      const markAsWalkable = includeQueued ? (walkable && t.alpha === 1) : walkable
      if (markAsWalkable) {
        matrix[t.y].push(0)
      } else {
        matrix[t.y].push(1)
      }
    })
  }
}
