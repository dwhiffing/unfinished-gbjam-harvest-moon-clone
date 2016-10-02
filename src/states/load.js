export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.image('tile', 'images/tile.png')
    this.load.spritesheet('player', 'images/player.png', 16, 16)
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
