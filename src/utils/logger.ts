import type { LogLevel, LogMeta } from '@types';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const levels: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const currentLevel = levels[LOG_LEVEL as LogLevel] ?? levels.info;

const formatTime = () => new Date().toISOString().replace('T', ' ').replace('Z', '');

const log = (level: LogLevel, message: string, meta?: LogMeta) => {
  if (levels[level] < currentLevel) return;

  const time = formatTime();
  const levelTag = level.toUpperCase().padEnd(5);

  if (meta) {
    // eslint-disable-next-line no-console
    console[level](`${time} | ${levelTag} | ${message}`, meta);
  } else {
    // eslint-disable-next-line no-console
    console[level](`${time} | ${levelTag} | ${message}`);
  }
};

export const logger = {
  debug: (message: string, meta?: LogMeta) => log('debug', message, meta),
  info: (message: string, meta?: LogMeta) => log('info', message, meta),
  warn: (message: string, meta?: LogMeta) => log('warn', message, meta),
  error: (message: string | Error, meta?: LogMeta) => {
    if (message instanceof Error) {
      log('error', message.message, {
        stack: message.stack,
        ...meta,
      });
    } else {
      log('error', message, meta);
    }
  },
};
