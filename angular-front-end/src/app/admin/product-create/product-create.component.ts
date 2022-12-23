import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  yourAttributes=null;

  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  submit(): void {
    const data = {
      yourAttributes: this.yourAttributes,
    };

    this.productService.create(data).subscribe(
      () => {
        this.router.navigate(['/admin/products']);
      }
    )
  }

}
