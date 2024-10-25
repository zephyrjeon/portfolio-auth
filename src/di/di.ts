import { IAppConfigs } from '../configs/config.interface';
import { appConfigs } from '../configs/getAppConfigs';
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

    return this;
  }

  get configs() {
    return this.resolve<IAppConfigs>(DI_KEY.CONFIGS);
  }
}

export enum DI_KEY {
  CONFIGS = 'CONFIGS',
  DB = 'DB',
}

export const di = DI.getInstance();
