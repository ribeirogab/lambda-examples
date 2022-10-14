import { Logger } from '../interfaces';

export const loggerConfig: Logger = {
  log(message, context?) {
    console.log(`${context ? `[${context}] - ` : ''}${message}`);
  },
};
