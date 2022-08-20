import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesActualComponent } from './places-actual.component';

describe('PlacesActualComponent', () => {
  let component: PlacesActualComponent;
  let fixture: ComponentFixture<PlacesActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
