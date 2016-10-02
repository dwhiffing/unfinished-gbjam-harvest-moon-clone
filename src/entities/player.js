let cursors, aKey, wKey, sKey, dKey, spaceKey, marker
let timerMax = 16
let timer = 0
const cameraSpeed = 8

export default class Player {
  constructor(game) {
    this.moving = false
    this.game = game
    this.sprite = game.add.sprite(this.game.width/2, this.game.height/2, 'player')
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
    if (!this.moving) {
      if (cursors.left.isDown || aKey.isDown) {
        this.moving = true
        this.dir = 2
      } else if (cursors.right.isDown || dKey.isDown) {
        this.moving = true
        this.dir = 4
      }
      if (cursors.up.isDown || wKey.isDown) {
        this.moving = true
        this.dir = 1
      } else if (cursors.down.isDown || sKey.isDown) {
        this.moving = true
        this.dir = 0
      }
    } else {
      timer--
      if (timer <= 0) {
        this.move()
        timer = timerMax
      }
    }
  }

  move() {
    if (this.dir === 2) {
      this.game.camera.x -= cameraSpeed
      this.sprite.frame = this.sprite.frame !== 5 ? 5 : 2
      this.sprite.scale.x = 1
    } else if (this.dir === 4) {
      this.sprite.frame = this.sprite.frame !== 5 ? 5 : 2
      this.sprite.scale.x = -1
      this.game.camera.x += cameraSpeed
    } else if (this.dir === 1) {
      this.sprite.frame = this.sprite.frame !== 4 ? 4 : 1
      this.game.camera.y -= cameraSpeed
    } else if (this.dir === 0) {
      this.sprite.frame = this.sprite.frame !== 3 ? 3 : 0
      this.game.camera.y += cameraSpeed
    }
    if (this.sprite.frame === 2 || this.sprite.frame === 1 || this.sprite.frame === 0) {
      this.moving = false
    }
  }

  selectTile(x, y) {
    this.currentTile = this.game.gameMap.getTile(x, y)
  }
}
