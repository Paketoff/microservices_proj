import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersServiceService } from 'src/app/services/orders-service.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrdersServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      number: new FormControl(null, [Validators.required, Validators.minLength(10),
      ])
    })
  }

  onSubmit(): void {
    this.form.disable();
    this.orderService.create(this.form.value).subscribe(
      () => {this.router.navigate(['/generators'])},
      error => {
      console.warn(error)
      this.form.enable()
      }
    );
  }
 
}
