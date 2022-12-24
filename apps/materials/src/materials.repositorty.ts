import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Material } from "../schemas/materials.schema";

@Injectable()
export class MaterialsRepository extends AbstractRepository<Material> {
  protected readonly logger = new Logger(MaterialsRepository .name);

  constructor(
    @InjectModel(Material.name) materialModel: Model<Material>, 
    @InjectConnection() connection: Connection,
  ) {
    super(materialModel, connection);
  }
}