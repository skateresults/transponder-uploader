export class Logger
  implements Pick<Console, "info" | "warn" | "error" | "debug">
{
  #console: Console;
  #verbose: boolean;

  constructor(console: Console, verbose: boolean) {
    this.#console = console;
    this.#verbose = verbose;
  }

  info(...args: Parameters<Console["info"]>): void {
    this.#console.info(...args);
  }

  warn(...args: Parameters<Console["warn"]>): void {
    this.#console.warn(...args);
  }

  error(...args: Parameters<Console["error"]>): void {
    this.#console.error(...args);
  }

  debug(...args: Parameters<Console["debug"]>): void {
    if (this.#verbose) {
      this.#console.debug(...args);
    }
  }
}
