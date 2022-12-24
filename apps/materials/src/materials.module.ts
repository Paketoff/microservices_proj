import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { DatabaseModule } from '@app/common/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, RmqModule } from '@app/common';
import { Material, MaterialSchema } from '../schemas/materials.schema';
import { BILLING_SERVICE } from '../constants/service';
import { MaterialsRepository } from './materials.repositorty';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/materials/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Material.name, schema: MaterialSchema }]),
    RmqModule.register({
      name: BILLING_SERVICE,
    }),
    AuthModule
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService, MaterialsRepository],
})

export class MaterialsModule {}
