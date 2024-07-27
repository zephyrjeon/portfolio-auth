import cors from 'cors';
import express from 'express';
import http from 'http';

export class AppServer {
  private httpServer: http.Server | null = null;
  private app = express();

  async startServer() {
    console.log('Starting up.....');

    this.useMiddlewares();

    this.httpServer = this.app.listen({ port: 3000 }, () => {
      console.log(`🚀 Server ready at ${3000}`);
    });

    this.app.get('/', (req, res) => {
      // const { name = 'user' } = req.query;
      res.send(`Hello!`);
    });

    this.app.get('/api/portfolio-auth/v1/health', (req, res) => {
      res
        .status(200)
        .json({ message: 'User created successfully!!' })
        .send('Auth service is healthy and OK.');
    });
  }

  async stop() {
    this.httpServer?.close?.();
  }

  private useMiddlewares() {
    // The default cors configuration is the equivalent of
    // {
    //   "origin": "*",
    //   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    //   "preflightContinue": false,
    //   "optionsSuccessStatus": 204
    // }
    this.app.use(
      cors({
        // origin: ['https://studio.apollographql.com', ' http://localhost:8082'],
        // credentials: true,
      })
    );

    // this.app.set('trust proxy', 1);
    this.app.use(express.json());
  }
}
