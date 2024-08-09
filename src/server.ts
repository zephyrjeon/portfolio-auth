import cors from 'cors';
import express from 'express';
import http from 'http';
import { IAppConfigs } from './configs/config.interface';
import { AppRoutes } from './routes/AppRoutes';

export class AppServer {
  private httpServer: http.Server | null = null;
  private app = express();

  constructor(private configs: IAppConfigs) {}

  async startServer() {
    console.log('Starting up.....');

    this.useMiddlewares();
    this.useAppRoutes();

    this.httpServer = this.app.listen({ port: this.configs.PORT }, () => {
      console.log(`🚀 Server ready at ${this.configs.PORT}`);
    });
  }

  async stop() {
    this.httpServer?.close?.();
  }

  private useMiddlewares() {
    this.app.use(cors({}));
    this.app.use(express.json());
  }

  private useAppRoutes() {
    new AppRoutes(this.app).routes();
  }
}
