import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Generator } from "./schemas/generator.schema";
import { AbstractRepository } from "@app/common/database/abstract.repository";

@Injectable()
export class GeneratorsRepository extends AbstractRepository<Generator> {
  protected readonly logger = new Logger(GeneratorsRepository.name);

  constructor(
    @InjectModel(Generator.name) generatorModel: Model<Generator>, 
    @InjectConnection() connection: Connection,
  ) {
    super(generatorModel, connection);
  }
}