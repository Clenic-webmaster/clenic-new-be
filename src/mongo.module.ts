import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from './utils/constants/database';

const mongoURL = `${database.connection}${database.dev.auth}${database.dev.ip}${database.dev.db}${database.dev.options}`;

@Module({
    imports: [
        MongooseModule.forRoot(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }),
    ],
    controllers: [],
    providers: [],
})
export class MongoModule {
}
