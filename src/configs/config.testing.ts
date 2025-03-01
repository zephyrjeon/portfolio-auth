import { getCommonServerConfigs } from './config.common';
import {
  IBaseConfigs,
  IJWTConfigs,
  IMongoConfigs,
  IURLConfigs,
} from './config.interface';

export const getTestServerConfigs = () => {
  const BASE_CONFIGS: IBaseConfigs = {
    PORT: 3000,
    COOKIE_SECRET: 'test',
  };

  const JWT_CONFIGS: IJWTConfigs = {
    JWT_SECRET: 'test',
    JWT_EXPERATION_TIME: 24 * 60 * 60,
  };

  const MONGO_CONFIGS: IMongoConfigs = {
    MONGO_URL: process.env.TEST_MONGO_URL!,
    MONGO_DB_NAME: process.env.TEST_MONGO_DB_NAME!,
  };

  const URL_CONFIGS: IURLConfigs = {
    PORTFOLIO_AUTH_URL: process.env.PORTFOLIO_AUTH_URL!,
  };

  return Object.assign(
    {},
    getCommonServerConfigs(),
    BASE_CONFIGS,
    JWT_CONFIGS,
    MONGO_CONFIGS,
    URL_CONFIGS
  );
};
