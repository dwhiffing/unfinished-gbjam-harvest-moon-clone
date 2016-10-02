import GameMap from '../entities/map'
import UserInterface from '../entities/interface'
import Player from '../entities/player'

export default {
  create(game) {
    game.stage.backgroundColor = '#2d2d2d'

    game.tileSize = 16

    game.gameMap = new GameMap(game, game.tileSize, 25)
    game.interface = new UserInterface(game, game.tileSize)
    game.player = new Player(game)

    game.camera.x = 0
    game.camera.y = 0
    game.camera.follow(game.player.sprite)
  },

  update(game) {
    game.interface.update()
    game.player.update()
  },

  render(game) {
    const y = game.height - 170
    game.debug.text(``, 16, y);
  }
}
