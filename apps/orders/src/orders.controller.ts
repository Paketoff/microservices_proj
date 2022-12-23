import { Delete, ExecutionContext, Param, Patch, Put, Req } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser} from 'apps/auth/src/current-user.decorator';
import { User } from 'apps/auth/src/users/schemas/user.schema';
import { CreateOrderRequest } from './dto/create-order.request';
import { UpdateOrderRequest } from './dto/update-order.request';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string): Promise<Order> {
    return this.ordersService.getOrderById(orderId);
  }
  
  @Post()
  async createOrder(
    @Body() request: CreateOrderRequest, @Req() req: any, @CurrentUser() currentUser: User
  ) {
    return this.ordersService.createOrder(request, currentUser, req.cookies?.Authentication);
  }

  @Put(':orderId')
  async updateOrder(
    @Param('orderId') orderId: string, 
    @Body() request: UpdateOrderRequest, @Req() req: any
  ) {
    return this.ordersService.updateOrder(orderId, request, req.cookies?.Authentication);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Delete(':orderId') 
  async deleteOrder(
    @Param('orderId') orderId: string
  ) {
    return this.ordersService.deleteOrder(orderId);
  }
}
