import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSchemaActualComponent } from './parking-schema-actual.component';

describe('ParkingSchemaActualComponent', () => {
  let component: ParkingSchemaActualComponent;
  let fixture: ComponentFixture<ParkingSchemaActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingSchemaActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSchemaActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
