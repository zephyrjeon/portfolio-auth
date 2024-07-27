import { AppServer } from './server';

const startServer = async () => {
  const server = new AppServer();

  server.startServer().catch((err) => {
    console.log(err);
  });
};

startServer();
