import Mongoose from 'mongoose';

import { envConfig } from './env.config';
import { loggerConfig } from './logger.config';

class MongooseConfig {
  get connectionUri() {
    const options = envConfig.MONGODB_URI_OPTIONS
      ? `?${envConfig.MONGODB_URI_OPTIONS}`
      : '';

    return `${envConfig.MONGODB_URL}/${envConfig.MONGODB_DB_NAME || 'default'}${options}`;
  }

  get connectOptions() {
    const user = envConfig.MONGODB_USER;
    const pass = envConfig.MONGODB_PASSWORD;
    return { user, pass };
  }

  public async connect() {
    if (Mongoose.connection?.readyState !== 1) {
      await Mongoose.connect(this.connectionUri, this.connectOptions);
      loggerConfig.log(
        'MongoDB connection has been established successfully',
        'MongooseConfig',
      );
    } else {
      loggerConfig.log('MongoDB connection already exists', 'MongooseConfig');
    }
  }

  public async disconnect() {
    if (Mongoose.connection?.readyState === 1) {
      await Mongoose.connection.close();
      loggerConfig.log('MongoDB connection was closed successfully', 'MongooseConfig');
    }
  }
}

export const mongooseConfig = new MongooseConfig();
