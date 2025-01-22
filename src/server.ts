import cors from 'cors';
import express from 'express';
import http from 'http';
import { DI } from './di/di';
import { AppRoutes } from './routes/AppRoutes';

export class AppServer {
  private httpServer: http.Server | null = null;
  private app = express();

  constructor(private di: DI) {
    process.on('SIGINT', async () => {
      console.log('on SIGINT');
      process.exit(0);
    });
  }

  get configs() {
    return this.di.configs;
  }

  async startServer() {
    console.log('Starting up.....');

    this.useMiddlewares();
    this.useAppRoutes();
    await this.di.db.connect();

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
