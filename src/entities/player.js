let cursors, aKey, wKey, sKey, dKey, spaceKey, marker
let timer = 0
let timerMax = 16
let slashTimerMax = 16
let slashTimer = 0
const speed = 8

export default class Player {
  constructor(game) {
    this.moving = false
    this.game = game
    this.x = 8
    this.y = 8
    this.dir = 0
    this.canSlash = true
    this.sprite = game.add.sprite(this.x * 16 + 9, this.y * 16 + 7, 'player')
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
    markerGraphics.lineStyle(2, 0x0f380f, 1)
    markerGraphics.drawRect(4, 4, game.tileSize-10, game.tileSize-10)
    marker.add(markerGraphics)
  }

  update() {
    if (!this.moving) {
      if (spaceKey.justDown && this.canSlash) {
        this.slash()
      }
      if (cursors.left.isDown || aKey.isDown) {
        this.moveTile(2)
      } else if (cursors.right.isDown || dKey.isDown) {
        this.moveTile(3)
      }
      if (cursors.up.isDown || wKey.isDown) {
        this.moveTile(1)
      } else if (cursors.down.isDown || sKey.isDown) {
        this.moveTile(0)
      }
    } else {
      timer--
      if (timer <= 0) {
        if (this.didMove) {
          this.move()
        } else {
          this.turn()
        }
        timer = timerMax
      }
    }
    slashTimer--
    if (slashTimer <= slashTimerMax/2) {
      marker.alpha = 0
    }
    if (slashTimer <= 0) {
      this.canSlash = true
    }
  }

  moveTile(dir) {
    this.moving = true
    if (this.dir === dir) {
      this.didMove = true
      if (dir === 0) {
        this.y++
      }
      if (dir === 1) {
        this.y--
      }
      if (dir === 2) {
        this.x--
      }
      if (dir === 3) {
        this.x++
      }
    }
    this.dir = dir
  }

  turn() {
    if (this.dir === 2) {
      this.sprite.scale.x = 1
      this.sprite.frame = 2
    } else if (this.dir === 3) {
      this.sprite.frame = 2
      this.sprite.scale.x = -1
    } else if (this.dir === 1) {
      this.sprite.frame = 1
    } else if (this.dir === 0) {
      this.sprite.frame = 0
    }
    this.moving = false
  }

  move() {
    if (this.dir === 2) {
      this.sprite.x -= speed
      this.sprite.frame = this.sprite.frame !== 5 ? 5 : 2
    } else if (this.dir === 3) {
      this.sprite.x += speed
      this.sprite.frame = this.sprite.frame !== 5 ? 5 : 2
    } else if (this.dir === 1) {
      this.sprite.y -= speed
      this.sprite.frame = this.sprite.frame !== 4 ? 4 : 1
    } else if (this.dir === 0) {
      this.sprite.y += speed
      this.sprite.frame = this.sprite.frame !== 3 ? 3 : 0
    }
    if (this.sprite.frame === 2 || this.sprite.frame === 1 || this.sprite.frame === 0) {
      this.moving = false
      this.didMove = false
    }
  }

  slash() {
    let x = this.x
    let y = this.y
    marker.alpha = 1
    slashTimer = slashTimerMax
    if (this.dir === 2) {
      x -= 1
    }
    if (this.dir === 3) {
      x += 1
    }
    if (this.dir === 1) {
      y -= 1
    }
    if (this.dir === 0) {
      y += 1
    }
    marker.x = x * 16 + 2
    marker.y = y * 16
  }
}
