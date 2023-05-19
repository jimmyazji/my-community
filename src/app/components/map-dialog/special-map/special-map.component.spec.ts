import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialMapComponent } from './special-map.component';

describe('SpecialMapComponent', () => {
  let component: SpecialMapComponent;
  let fixture: ComponentFixture<SpecialMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
