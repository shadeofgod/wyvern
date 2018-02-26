import * as path from 'path'
import * as url from 'url'

import { app, BrowserWindow } from 'electron'

import { Env } from './utils'

let mainWindow: Electron.BrowserWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    frame: false,
    height: 600,
    show: false,
    width: 800,
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  }))

  let loadingWindow: Electron.BrowserWindow = new BrowserWindow({
    backgroundColor: 'transparent',
    frame: false,
    height: 160,
    // modal: true,
    // parent: mainWindow,
    show: false,
    transparent: true,
    width: 160,
  })

  loadingWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../assets/images/loading.gif'),
    protocol: 'file:',
    slashes: true,
  }))

  loadingWindow.once('ready-to-show', () => loadingWindow.show())

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      loadingWindow.close()
      mainWindow.show()
    }, 10000)
  })

  loadingWindow.on('closed', () => {
    loadingWindow = null
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('show', () => {
    if (Env.isDev) {
      mainWindow.webContents.openDevTools()
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (!Env.isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
