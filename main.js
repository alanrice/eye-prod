'use strict'

const electron = require('electron')
const path = require('path')

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const menubar = require('menubar')

var mb = menubar({icon: path.join(__dirname, 'icon.png'),
	index: 'file://' + path.join(__dirname, 'index.html'),
	width: 600,
	height: 430,
	resizable: false,
	'preload-window': true})

mb.on('ready', function ready () {
  console.log('app is ready')
  // mb.window.openDevTools()

  require('electron').powerMonitor.on('suspend', function () {
    mb.window.webContents.send('status-from-main', 'suspend')
  })
  require('electron').powerMonitor.on('resume', function () {
    mb.window.webContents.send('status-from-main', 'resume')
  })
})
