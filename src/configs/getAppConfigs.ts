import * as dotenv from 'dotenv';
import path from 'path';
import { getCommonServerConfigs } from './config.common';
import { getProdServerConfigs } from './config.production';
import { getTestServerConfigs } from './config.testing';

function getAppConfigs() {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is undefined');
  }

  const envPath = path.join(__dirname, `../../.env`);

  const { error } = dotenv.config({ path: envPath });

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  if (process.env.NODE_ENV === 'production') {
    return getProdServerConfigs();
  } else if (process.env.NODE_ENV === 'test') {
    return getTestServerConfigs();
  } else {
    return getCommonServerConfigs();
  }
}

export const appConfigs = getAppConfigs();

console.log(`Environment ${process.env.NODE_ENV} App Configs: `, appConfigs);
