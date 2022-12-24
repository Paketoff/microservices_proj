import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsCreateComponent } from './materials-create.component';

describe('MaterialsCreateComponent', () => {
  let component: MaterialsCreateComponent;
  let fixture: ComponentFixture<MaterialsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
