let cursors, aKey, wKey, sKey, dKey, spaceKey, marker
let timerMax = 10
let timer = timerMax
const cameraSpeed = 8

export default class Player {
  constructor(game) {
    this.game = game
    this.sprite = game.add.sprite(this.game.width/2-8, this.game.height/2-8, 'player')
    this.sprite.fixedToCamera = true
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.currentTile = null

    cursors = game.input.keyboard.createCursorKeys()
    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A)
    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S)
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D)
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    marker = game.add.group()
    const markerGraphics = game.add.graphics()
    markerGraphics.lineStyle(2, 0x000000, 1)
    markerGraphics.drawRect(0, 0, game.tileSize, game.tileSize)
    marker.add(markerGraphics)
  }

  update() {
    timer--
    if (timer <= 0) {
      timer = timerMax
      if (cursors.left.isDown || aKey.isDown) {
        this.game.camera.x -= cameraSpeed
        this.sprite.frame = this.sprite.frame === 2 ? 5 : 2
        this.sprite.scale.x = 1
      } else if (cursors.right.isDown || dKey.isDown) {
        this.sprite.frame = this.sprite.frame === 2 ? 5 : 2
        this.sprite.scale.x = -1
        this.game.camera.x += cameraSpeed
      }
      if (cursors.up.isDown || wKey.isDown) {
        this.sprite.frame = this.sprite.frame === 1 ? 4 : 1
        this.game.camera.y -= cameraSpeed
      } else if (cursors.down.isDown || sKey.isDown) {
        this.sprite.frame = this.sprite.frame === 0 ? 3 : 0
        this.game.camera.y += cameraSpeed
      }
    }
  }

  selectTile(x, y) {
    this.currentTile = this.game.gameMap.getTile(x, y)
  }
}
