import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { CreateMaterialRequest } from '../dto/create-material.request';
import { MaterialsService } from './materials.service';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  async getMaterials() {
    return this.materialsService.getMaterials()
  }

  @Get(':materialId')
  async getMaterialById(@Param ('materialId')
  materialId: string) {
    return this.materialsService.getMaterialsById(materialId);
  }

  @Post()
  async createMaterial(@Body() request: CreateMaterialRequest, @Req() req: any) {
    return this.materialsService.createMaterial(request, req.cookies?.Authentication);
  }

  @Delete(':materialId')
  async deleteMaterial(
    @Param('materialId') materialId: string
  ) {
    return this.materialsService.deleteMaterial(materialId);
  }
}
