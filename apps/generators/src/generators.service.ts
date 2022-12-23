import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from 'apps/orders/src/schemas/order.schema';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateGeneratorRequest } from './dto/create-generator.request';
import { UpdateGeneratorRequest } from './dto/update-generator.request';
import { GeneratorsRepository } from './generators.repository';

@Injectable()
export class GeneratorsService {

  constructor(
    private readonly generatorsRepository: GeneratorsRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async getGenerators() {
    return this.generatorsRepository.find({});
  }

  async getGeneratorById(generatorId: string) {
    return this.generatorsRepository.findOne({"_id": generatorId});
  }

  async createGenerator(request: CreateGeneratorRequest, authentication: string) {
    const session = await this.generatorsRepository.startTransaction();
    try {
      const generator = await this.generatorsRepository.create(request, {session});
      await lastValueFrom(
        this.billingClient.emit('generator_created', {
          request,
          Authentication: authentication,
        })
      );
      await session.commitTransaction();
      return generator;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async updateGenerator(orderId: string , request: UpdateGeneratorRequest, authentication: string) {
    const filterQuery = {"_id": orderId};
    const session = await this.generatorsRepository.startTransaction();
    try {
      const generator = await this.generatorsRepository.create(request, {session});
      await lastValueFrom(
        this.billingClient.emit('generator_created', {
          request,
          Authentication: authentication,
        })
      );
      await session.commitTransaction();
      return generator;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async deleteGenerator(generatorId: string) {
    return this.generatorsRepository.findOneAndDelete(
      {"_id": generatorId}
    );
  }
}
