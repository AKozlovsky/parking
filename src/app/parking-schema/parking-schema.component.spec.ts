import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSchemaComponent } from './parking-schema.component';

describe('ParkingSchemaComponent', () => {
  let component: ParkingSchemaComponent;
  let fixture: ComponentFixture<ParkingSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
