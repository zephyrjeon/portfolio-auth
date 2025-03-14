import cors from 'cors';
import express from 'express';
import http from 'http';
import { DI } from './di/di';
import { AppRoutes } from './routes/AppRoutes';
import cookieParser from 'cookie-parser';

export class AppServer {
  private httpServer: http.Server | null = null;
  app = express();

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
    await this.di.db.disconnect();
    this.httpServer?.close?.();
  }

  private useMiddlewares() {
    this.app.use(cors({}));
    this.app.use(express.json());
    this.app.use(cookieParser(this.configs.COOKIE_SECRET));
  }

  private useAppRoutes() {
    new AppRoutes(this.app).routes();
  }
}
