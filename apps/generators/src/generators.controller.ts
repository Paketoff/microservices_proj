import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { CreateGeneratorRequest } from './dto/create-generator.request';
import { GeneratorsService } from './generators.service';

@Controller('generators')
export class GeneratorsController {
  constructor(private readonly generatorsService: GeneratorsService) {}

  @Get()
  async getGenerators() {
    return this.generatorsService.getGenerators();
  }

  @Get(':generatorId')
  async getGeneratorById(@Param('generatorId') generatorId: string) {
    return this.generatorsService.getGeneratorById(generatorId);
  }

  @Post()
  async createGenerator(@Body() request: CreateGeneratorRequest, @Req() req: any) {
    return this.generatorsService.createGenerator(request, req.cookies?.Authentication);
  }

  @Delete(':generatorId') 
  async deleteOrder(
    @Param('generatorId') generatorId: string
  ) {
    return this.generatorsService.deleteGenerator(generatorId);
  }
}
