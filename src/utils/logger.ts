import log4js from 'log4js';

let logger: log4js.Logger;

export const getLogger = (): log4js.Logger => {
  if (!logger) configure();

  return logger;
};

const configure = () => {
  log4js.addLayout('json', function () {
    return function (logEvent) {
      // log4js wraps logged events inside {data: [___]} by default
      // our log pipeline does not handle this well, so remap this
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const flatLog = { ...logEvent, ...logEvent.data[0] };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      delete flatLog.data;
      // modified from https://github.com/log4js-node/log4js-node/blob/master/lib/LoggingEvent.js#L36
      return JSON.stringify(flatLog, (_key, value) => {
        // JSON.stringify(new Error('test')) returns {}, which is not really useful for us.
        // The following allows us to serialize errors correctly.
        // duck-typing for Error object
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (value && value.message && value.stack) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value = Object.assign(
            // eslint-disable-next-line
            { message: value.message, stack: value.stack },
            value,
          );
        }
        // JSON.stringify({a: parseInt('abc'), b: 1/0, c: -1/0}) returns {a: null, b: null, c: null}.
        // The following allows us to serialize to NaN, Infinity and -Infinity correctly.
        else if (
          typeof value === 'number' &&
          (Number.isNaN(value) || !Number.isFinite(value))
        ) {
          value = value.toString();
        }
        // JSON.stringify([undefined]) returns [null].
        // The following allows us to serialize to undefined correctly.
        else if (typeof value === 'undefined') {
          value = typeof value;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return value;
      });
    };
  });

  log4js.configure({
    appenders: {
      out: {
        type: 'stdout',
        layout: { type: 'json' },
      },
    },
    categories: {
      default: {
        appenders: ['out'],
        level:
          process.env.NODE_ENV === 'test'
            ? 'off'
            : process.env.LOG_LEVEL || 'info',
      },
    },
  });

  logger = log4js.getLogger();
};
