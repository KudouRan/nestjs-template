import { format, LoggerOptions, transports } from 'winston';
import { utilities } from 'nest-winston';

const options: LoggerOptions = {
  format: format.simple(),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        utilities.format.nestLike('Nest', {
          prettyPrint: true,
        }),
      ),
    }),
    new transports.File({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        format.printf((info) => {
          return `${new Date(info.timestamp).toLocaleString()} ${
            info.level
          }: [${info.context}] ${info.message}`;
        }),
      ),
      filename: 'logs/all-logs.log',
      maxsize: 1048576, // 1MB
    }),
  ],
};

export default options;
