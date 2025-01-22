import { IAppConfigs } from '../configs/config.interface';
import { appConfigs } from '../configs/getAppConfigs';
import { DB } from '../db/db';
import { Container } from './Container';

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
    this.container.register(DI_KEY.CONFIGS, { value: appConfigs });
    this.container.register(DI_KEY.DB, {
      constructor: DB,
      deps: [DI_KEY.CONFIGS],
      scope: 'singleton',
    });

    return this;
  }

  get configs() {
    return this.resolve<IAppConfigs>(DI_KEY.CONFIGS);
  }

  get db() {
    return this.resolve<DB>(DI_KEY.DB);
  }
}

export enum DI_KEY {
  CONFIGS = 'CONFIGS',
  DB = 'DB',
}

export const di = DI.getInstance();
