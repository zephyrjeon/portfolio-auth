import { getCommonServerConfigs } from './config.common';
import {
  IAppConfigs,
  IBaseConfigs,
  IJWTConfigs,
  IMongoConfigs,
  IURLConfigs,
} from './config.interface';

export const getProdServerConfigs = () => {
  const BASE_CONFIGS: IBaseConfigs = {
    PORT: parseInt(process.env.PORT!),
    COOKIE_SECRET: process.env.COOKIE_SECRET!,
  };

  const JWT_CONFIGS: IJWTConfigs = {
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPERATION_TIME: 24 * 60 * 60,
  };

  const MONGO_CONFIGS: IMongoConfigs = {
    MONGO_URL: process.env.MONGO_URL!,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME!,
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
