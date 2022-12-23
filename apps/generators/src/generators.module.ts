import { AuthModule, RmqModule } from '@app/common';
import { DatabaseModule } from '@app/common/database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import * as Joi from 'joi';
import { BILLING_SERVICE } from './constants/services';
import { GeneratorsController } from './generators.controller';
import { GeneratorsRepository } from './generators.repository';
import { GeneratorsService } from './generators.service';
import { Generator, GeneratorSchema } from './schemas/generator.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/generators/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Generator.name, schema: GeneratorSchema }]),
    RmqModule.register({
      name: BILLING_SERVICE,
    }),
    AuthModule
  ],
  controllers: [GeneratorsController],
  providers: [GeneratorsService, GeneratorsRepository],
})
export class GeneratorsModule {}
