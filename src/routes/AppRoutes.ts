import { Application } from 'express';
import { health } from '../controllers/health';
import { signup } from '../controllers/signup';
import { signin } from '../controllers/signin';
import { verifyEmail } from '../controllers/verifyEmail';
import { sendEmailVerification } from '../controllers/sendEmailVerification';
import { resetPassword } from '../controllers/resetPassword';
import { changePassword } from '../controllers/changePassword';
import { signout } from '../controllers/signout';

export class AppRoutes {
  constructor(private app: Application) {}

  private basePath(v: number) {
    return `/api/v${v}`;
  }

  routes() {
    this.app.get(this.basePath(1) + '/health', health);
    this.app.post(this.basePath(1) + '/signup', signup);
    this.app.post(this.basePath(1) + '/signin', signin);
    this.app.post(this.basePath(1) + '/signout', signout);
    this.app.post(this.basePath(1) + '/verify-email', verifyEmail);
    this.app.post(
      this.basePath(1) + '/send-email-verification',
      sendEmailVerification
    );
    this.app.post(this.basePath(1) + '/reset-password', resetPassword);
    this.app.post(this.basePath(1) + '/change-password', changePassword);
  }
}
