import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  result: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.all().subscribe(
      (result: Object) => {
        this.result = result;
      }
    );
  }



  delete(id: string): void {
    if(confirm('Are you sure you want to delete this item?')) {
    this.productService.delete(id).subscribe(
      () => {
        // this.result = this.result.filter(); //TODO refresh
      }
    );
    }
  }

}
