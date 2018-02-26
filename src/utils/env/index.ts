export class Env {
  static get isDev(): boolean {
    return process.env.ELECTRON_ENV === 'development'
  }

  static get isMac(): boolean {
    return process.platform === 'darwin'
  }

  static get isWin(): boolean {
    return process.platform === 'win32'
  }
}
