import "reflect-metadata";
import { ExecutionContext, Injectable, Req } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';
import { Inject } from "@nestjs/common";
import { BILLING_SERVICE } from "./constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { last, lastValueFrom } from "rxjs";
import { UpdateOrderRequest } from "./dto/update-order.request";
import { Order } from "./schemas/order.schema";
import { User } from "apps/auth/src/users/schemas/user.schema";
import { UsersRepository } from "apps/auth/src/users/users.repository";

@Injectable()
export class OrdersService {

  constructor(
    private readonly ordersRepository: OrdersRepository, 
    private readonly usersRepository: UsersRepository, 
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
    ) {}

  async getOrderById(orderId: string): Promise<Order> {
    return this.ordersRepository.findOne({"_id": orderId}).then(order => {
      return order
    });
  }

  async createOrder(request: CreateOrderRequest, user, authentication: string) {
    // return this.ordersRepository.create(request);
    const session = await this.ordersRepository.startTransaction();
    try {
      const userFound = await this.usersRepository.findOne(user);
      userFound.password = null;
      userFound.orders = null;
      const order = await this.ordersRepository.create({...request, user: {...userFound}}, {session});
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request, 
          Authentication: authentication,
        })
      );
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction(); //atomic transaction (if we cannot do connect with billing service the order will be canceled then)
      throw error;
    }
  }
  
  async updateOrder(orderId: string , request: UpdateOrderRequest, authentication: string) {
    const session = await this.ordersRepository.startTransaction();
    const filterQuery = {"_id": orderId};
    try {
      const orderUpdate = await this.ordersRepository.findOneAndUpdate(filterQuery, UpdateOrderRequest);
      await lastValueFrom(
        this.billingClient.emit('order_updated', {
          request, 
          Authentication: authentication,
        })
      );
      await session.commitTransaction();
      return orderUpdate;
    } catch (error) { 
      await session.abortTransaction();
      throw error;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }

  async deleteOrder(orderId: string) {
    return this.ordersRepository.findOneAndDelete({"_id": orderId}).then(
      deletedOrder => {return deletedOrder}
    )
  }
}
