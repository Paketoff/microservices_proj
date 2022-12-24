import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from '../constants/service';
import { CreateMaterialRequest } from '../dto/create-material.request';
import { UpdateMaterialRequest } from '../dto/update-material.request';
import { MaterialsRepository } from './materials.repositorty';

@Injectable()
export class MaterialsService {
 
  constructor(
    private readonly materialsRepository: MaterialsRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async getMaterials() {
    return this.materialsRepository.find({});
  }

  async getMaterialsById(materialId: string) {
    return this.materialsRepository.findOne({"_id": materialId});
  }

  async createMaterial(request: CreateMaterialRequest, 
    authentication: string) {
      const session = await this.materialsRepository.startTransaction();
    try {
      const generator = await this.materialsRepository.create(request, {session});
      await lastValueFrom(
        this.billingClient.emit('material_created', {
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

  async updateMaterial(materialId: string , request: UpdateMaterialRequest, authentication: string) {
    const filterQuery = {"_id": materialId};
    const session = await this.materialsRepository.startTransaction();
    try {
      const generator = await this.materialsRepository.create(request, {session});
      await lastValueFrom(
        this.billingClient.emit('material_updated', {
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

  async deleteMaterial(materialId: string) {
    return this.materialsRepository.findOneAndDelete(
      {"_id": materialId}
    );
  }

}
