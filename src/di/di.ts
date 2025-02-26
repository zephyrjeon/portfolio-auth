import { IAppConfigs } from '../configs/config.interface';
import { appConfigs } from '../configs/getAppConfigs';
import { DB } from '../db/db';
import { AccountRepository } from '../repositories/AccountRepository';
import { AuthService } from '../services/AuthService';
import { validator, Validator } from '../validator/Validator';
import { Container, SCOPE } from './Container';

export class DI {
  private container = new Container<DI_KEY>();
  private static instance: DI;
  private constructor() {}

  public static getInstance() {
    if (!DI.instance) {
      DI.instance = new DI();
    }

    return DI.instance;
  }

  resolve<T>(token: DI_KEY): T {
    return this.container.resolve<T>(token);
  }

  registerDeps() {
    this.container.register(DI_KEY.DI, { value: di });
    this.container.register(DI_KEY.CONFIGS, { value: appConfigs });
    this.container.register(DI_KEY.VALIDATOR, { value: validator });
    this.container.register(DI_KEY.DB, {
      constructor: DB,
      deps: [DI_KEY.CONFIGS],
      scope: SCOPE.SINGLETON,
    });
    this.container.register(DI_KEY.ACCOUNT_REPOSITORY, {
      constructor: AccountRepository,
      deps: [DI_KEY.DB],
      scope: SCOPE.SINGLETON,
    });
    this.container.register(DI_KEY.AUTH_SERVICE, {
      constructor: AuthService,
      deps: [DI_KEY.DI, DI_KEY.ACCOUNT_REPOSITORY],
      scope: SCOPE.SINGLETON,
    });

    // initialize
    this.db;
    this.authRepository;
    this.authService;

    return this;
  }

  get configs() {
    return this.resolve<IAppConfigs>(DI_KEY.CONFIGS);
  }

  get validator() {
    return this.resolve<Validator>(DI_KEY.VALIDATOR);
  }

  get db() {
    return this.resolve<DB>(DI_KEY.DB);
  }

  get authRepository() {
    return this.resolve<DI_KEY.ACCOUNT_REPOSITORY>(DI_KEY.ACCOUNT_REPOSITORY);
  }

  get authService() {
    return this.resolve<AuthService>(DI_KEY.AUTH_SERVICE);
  }
}

export enum DI_KEY {
  DI = 'DI',
  CONFIGS = 'CONFIGS',
  VALIDATOR = 'VALIDATOR',
  DB = 'DB',
  ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY',
  AUTH_SERVICE = 'AUTH_SERVICE',
}

export const di = DI.getInstance();
