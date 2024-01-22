import * as mongoose from 'mongoose';
import { config } from 'dotenv';
config();
export const databaseProviders = {
  provide: 'DATABASE_CONNECTION',
  useFactory: (): Promise<typeof mongoose> => {
    return mongoose.connect(process.env.CONNECTIONSTRING);
  },
};