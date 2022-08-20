import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSchemaTomorrowComponent } from './parking-schema-tomorrow.component';

describe('ParkingSchemaTomorrowComponent', () => {
  let component: ParkingSchemaTomorrowComponent;
  let fixture: ComponentFixture<ParkingSchemaTomorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingSchemaTomorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSchemaTomorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
