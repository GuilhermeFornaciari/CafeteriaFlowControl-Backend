import { Module } from '@nestjs/common';
import { databaseProviders as connectDatabase } from './mongodbProvider';
@Module({
    controllers: [
        
    ],
    providers: [
        connectDatabase,
    ],
    exports: [connectDatabase]
})
export class AppModule {}