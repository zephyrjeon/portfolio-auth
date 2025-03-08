import { di } from '../di/di';
import { AppServer } from '../server';

export const testServer = new AppServer(di.registerDeps());

export const ba = async () => {
  await testServer.startServer();
};

export const aa = async () => {
  await testServer.stop();
};

export const be = async () => {};

export const ae = async () => {};
