import { DB } from '../db/db';
import { AccountEntity } from '../schemas/accountEntity';

interface IBaseRepository<Entity> {
  create: (data: Omit<Entity, 'id'>) => Promise<Entity>;
  findOneById: (id: string) => Promise<Entity | null>;
  findOneByEmail: (email: string) => Promise<Entity | null>;
}

export interface IAccountRepository extends IBaseRepository<AccountEntity> {}

export class AccountRepository implements IAccountRepository {
  constructor(private db: DB) {
    // this.collection.drop();
    this.collection.createIndex({ email: 1 }, { unique: true });
  }

  private get collection() {
    return this.db.mongoDb.collection<Omit<AccountEntity, 'id'>>('account');
  }

  private projection = {
    _id: 0,
    id: { $toString: '$_id' },
    name: 1,
    email: 1,
    password: 1,
  };

  async create(data: Omit<AccountEntity, 'id'>) {
    const { insertedId } = await this.collection.insertOne({ ...data });

    return {
      id: insertedId.toString(),
      ...data,
    };
  }

  async findOneById(id: string) {
    return await this.collection.findOne<AccountEntity>(
      { _id: this.db.toObjectId(id) },
      { projection: this.projection }
    );
  }

  async findOneByEmail(email: string) {
    return await this.collection.findOne<AccountEntity>(
      { email },
      { projection: this.projection }
    );
  }

  update() {}
  delete() {}
}
