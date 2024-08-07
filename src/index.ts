import 'reflect-metadata';
import { appConfigs } from './configs/getAppConfigs';
import { AppServer } from './server';

const startServer = async () => {
  const server = new AppServer(appConfigs);

  server.startServer().catch((err) => {
    console.log(err);
  });
};

startServer();
