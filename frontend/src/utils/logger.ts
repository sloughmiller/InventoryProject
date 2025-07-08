type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'trace' | 'fatal';

const timestamp = () => new Date().toISOString();

function shouldLog(level: LogLevel): boolean {
  if (import.meta.env.MODE !== 'development' && level === 'debug') return false;
  return true;
}

function format(level: LogLevel, context: string, args: unknown[]) {
  return [`[${level.toUpperCase()}]`, `[${timestamp()}]`, `[${context}]`, ...args];
}

export const log = {
  debug: (context: string, ...args: unknown[]) => {
    if (shouldLog('debug')) console.debug(...format('debug', context, args));
  },
  info: (context: string, ...args: unknown[]) => {
    console.info(...format('info', context, args));
  },
  warn: (context: string, ...args: unknown[]) => {
    console.warn(...format('warn', context, args));
  },
  error: (context: string, ...args: unknown[]) => {
    console.error(...format('error', context, args));
  },
  trace: (context: string, ...args: unknown[]) => {
    console.trace(...format('trace', context, args));
  },
  fatal: (context: string, ...args: unknown[]) => {
    console.error(...format('fatal', context, args));
    // Hook: send to external error tracking
    // e.g. sendToSentry('fatal', context, args)
  },
};
