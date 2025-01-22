export interface IAppConfigs
  extends IBaseConfigs,
    IJWTConfigs,
    IMongoConfigs,
    IURLConfigs {}

export interface IBaseConfigs {
  PORT: number;
  COOKIE_SECRET: string;
}

export interface IJWTConfigs {
  JWT_SECRET: string;
  JWT_EXPERATION_TIME: number;
}

export interface IURLConfigs {
  PORTFOLIO_AUTH_URL: string;
}

export interface IMongoConfigs {
  MONGO_URL: string;
  MONGO_DB_NAME: string;
}
