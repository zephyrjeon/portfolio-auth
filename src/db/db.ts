import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import { IAppConfigs } from '../configs/config.interface';

export class DB {
  mongoClient: MongoClient;
  mongoDb: Db;

  constructor(public configs: IAppConfigs) {
    this.mongoClient = new MongoClient(configs.MONGO_URL, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    this.mongoDb = this.mongoClient.db(configs.MONGO_DB_NAME);
  }

  async connect() {
    let retry = 5;

    while (retry > 0) {
      try {
        await this.mongoClient.connect();
        await this.mongoClient.db('admin').command({ ping: 1 });
        console.log('Successfully connected to MongoDB!');
        return this.mongoClient.db();
      } catch (e) {
        console.log('Mongo connection failed, retrying...');
        await new Promise((res) => setTimeout(res, 1000));
        retry--;
      }
    }

    throw new Error('Failed to connect to MongoDB!');
  }

  async disconnect() {
    await this.mongoClient.close();
  }
}
