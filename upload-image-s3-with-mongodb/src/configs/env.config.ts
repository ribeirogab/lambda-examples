import { get } from 'env-var';

const nodeEnv = ['production', 'development'] as const;
const stage = ['local', 'dev', 'prod'] as const;

export const envConfig = {
  NODE_ENV: get('NODE_ENV').required().asEnum(nodeEnv),
  STAGE: get('STAGE').required().asEnum(stage),

  MONGODB_DB_NAME: get('MONGODB_DB_NAME').asString(),
  MONGODB_URI_OPTIONS: get('MONGODB_URI_OPTIONS').asString(),
  MONGODB_URL: get('MONGODB_URL').required().asString(),
  MONGODB_USER: get('MONGODB_USER').required().asString(),
  MONGODB_PASSWORD: get('MONGODB_PASSWORD').required().asString(),

  BUCKET_NAME: get('BUCKET_NAME').required().asString(),
  AWS_REGION: get('AWS_DEFAULT_REGION').default('us-east-1').asString(),
};
