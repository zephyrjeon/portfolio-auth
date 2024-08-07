import { COMMON_SERVER_CONFIGS } from './config.common';
import {
  IJWTConfigs,
  IBaseConfigs,
  IAppConfigs,
  IURLConfigs,
} from './config.interface';

const BASE_CONFIGS: IBaseConfigs = {
  PORT: parseInt(process.env.PORT!),
  COOKIE_SECRET: process.env.COOKIE_SECRET!,
};

const JWT_CONFIGS: IJWTConfigs = {
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPERATION_TIME: 24 * 60 * 60,
};

const URL_CONFIGS: IURLConfigs = {
  PORTFOLIO_AUTH_URL: process.env.PORTFOLIO_AUTH_URL!,
};

export const PROD_SERVER_CONFIGS: IAppConfigs = Object.assign(
  {},
  COMMON_SERVER_CONFIGS,
  BASE_CONFIGS,
  JWT_CONFIGS,
  URL_CONFIGS
);
