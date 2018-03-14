import 'pixi'
import 'p2'
import Phaser from 'phaser'

window.Phaser = Phaser

const colors = [
  0x9bbc0f,
  0x8bac0f,
  0x306230,
  0x0f380f,
]

import BootState from './states/boot'
import LoadState from './states/load'
import PlayState from './states/play'

(function() {
  let game = new Phaser.Game(160, 144, Phaser.AUTO, 'app', null, false, false)

  game.state.add('boot', BootState)
  game.state.add('load', LoadState)
  game.state.add('play', PlayState)
  game.state.start('boot')
})()
