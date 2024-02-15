import * as mongoose from 'mongoose';
import { config } from 'dotenv';
export const databaseProviders = {
  provide: 'DATABASE_CONNECTION',
  useFactory: (): Promise<typeof mongoose> => {
    config();
    return mongoose.connect('mongodb+srv://jcaguiarpg:AtwqnpnWrBt2kc0p@teting.j3va5y2.mongodb.net/?retryWrites=true&w=majority');
  },
};