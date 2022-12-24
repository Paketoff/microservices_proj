import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {

  constructor(private materialService: MaterialService) { }

  result: any;

  ngOnInit(): void {
    this.materialService.all().subscribe(
      (result: Object) => {
        this.result = result;
      }
    );
  }

  delete(id: string): void {
    if(confirm('Are you sure you want to delete this item?')) {
    this.materialService.delete(id).subscribe(
      () => {
        // this.result = this.result.filter(); //TODO refresh
      }
    );
    }
  }

}
