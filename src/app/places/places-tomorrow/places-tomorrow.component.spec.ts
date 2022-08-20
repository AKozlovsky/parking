import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesTomorrowComponent } from './places-tomorrow.component';

describe('PlacesTomorrowComponent', () => {
  let component: PlacesTomorrowComponent;
  let fixture: ComponentFixture<PlacesTomorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesTomorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesTomorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
