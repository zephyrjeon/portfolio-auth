import * as dotenv from 'dotenv';
import path from 'path';
import { COMMON_SERVER_CONFIGS } from './config.common';
import { PROD_SERVER_CONFIGS } from './config.production';

function getAppConfigs() {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is undefined');
  }

  const envPath = path.join(__dirname, `../../.env`);

  const { parsed, error } = dotenv.config({ path: envPath });

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  if (process.env.NODE_ENV === 'production') {
    return Object.assign(PROD_SERVER_CONFIGS, parsed);
  } else {
    return Object.assign(COMMON_SERVER_CONFIGS, parsed);
  }
}

export const appConfigs = getAppConfigs();

console.log('App Configs: ', appConfigs);
