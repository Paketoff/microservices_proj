import { Component, OnInit } from '@angular/core';
import { OrdersServiceService } from 'src/app/services/orders-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  result: any;

  constructor(
    private orderService: OrdersServiceService,
    ) { }

  ngOnInit(): void {
    this.orderService.all().subscribe(
      (result: Object) => {
        this.result = result;
        console.log(result);
      }
    );
  }

}
