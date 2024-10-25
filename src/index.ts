import 'reflect-metadata';
import { di } from './di/di';
import { AppServer } from './server';

const startServer = async () => {
  const server = new AppServer(di.registerDeps());

  server.startServer().catch((err) => {
    console.log(err);
  });
};

startServer();
