import { Application } from 'express';
import { health } from '../controllers/health';
import { signup } from '../controllers/signup';

export class AppRoutes {
  constructor(private app: Application) {}

  private basePath(v: number) {
    return `/api/v${v}`;
  }

  routes() {
    this.app.get(this.basePath(1) + '/health', health);
    this.app.post(this.basePath(1) + '/signup', signup);
    this.app.use(this.basePath(1) + '/signin', () => {});
    this.app.use(this.basePath(1) + '/verify-email', () => {});
    this.app.use(this.basePath(1) + '/reset-password', () => {});
    this.app.use(this.basePath(1) + '/change-password', () => {});
  }
}
