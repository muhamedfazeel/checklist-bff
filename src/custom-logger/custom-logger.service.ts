import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';

type CONSOLE_LOG_LEVELS = 'debug' | 'error' | 'info' | 'log' | 'warn';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  prettyPrintLog: boolean;
  constructor(context?: any, options = {}) {
    super(context, options);
    this.init();
  }

  private init() {
    const LOGGER_LEVEL = process.env.LOGGER_LEVEL;
    const loggerLevel: LogLevel[] = ['error', 'warn', 'log', 'debug'];
    const envLogIndex = loggerLevel.findIndex((i) => i === LOGGER_LEVEL);

    this.setLogLevels(loggerLevel.slice(0, envLogIndex + 1));
    this.prettyPrintLog = JSON.parse(process.env.LOG_PRETTY_PRINT || 'false');
  }

  log(message: any, ...args: any[]) {
    if (!this.isLevelEnabled('log')) return;

    if (this.isPrettyPrint()) {
      super.log.apply(this, [message, ...args]);
      return;
    }
    this.printPlain(message, 'log');
  }

  error(message: any, ...args: any[]) {
    if (!this.isLevelEnabled('error')) return;

    if (this.isPrettyPrint()) {
      super.error.apply(this, [message, ...args]);
      return;
    }
    this.printPlain(message, 'error');
  }

  warn(message: any, ...args: any[]) {
    if (!this.isLevelEnabled('warn')) return;

    if (this.isPrettyPrint()) {
      super.warn.apply(this, [message, ...args]);
      return;
    }
    this.printPlain(message, 'warn');
  }

  debug(message: any, ...args: any[]) {
    if (!this.isLevelEnabled('debug')) return;

    if (this.isPrettyPrint()) {
      super.debug.apply(this, [message, ...args]);
      return;
    }
    this.printPlain(message, 'debug');
  }

  verbose(message: any, ...args: any[]) {
    if (!this.isLevelEnabled('verbose')) return;

    if (this.isPrettyPrint()) {
      super.verbose.apply(this, [message, ...args]);
      return;
    }
    this.printPlain(message, 'debug');
  }

  /**
   * Checks whether the print operation is pretty or not.
   * @returns {boolean} Whether the print operation is pretty or not.
   */
  private isPrettyPrint = (): boolean => this.prettyPrintLog;

  /**
   * Method to print a plain message.
   * @param {any} message Message to be printed.
   * @param {CONSOLE_LOG_LEVELS} level Console log levels.
   */
  private printPlain(message: any, level: CONSOLE_LOG_LEVELS): void {
    const formattedLog = `[${this.context || 'NA'}] ${JSON.stringify(message)}`;
    console[level](formattedLog);
  }
}
