import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAnAppointmentComponent } from './request-an-appointment.component';

describe('RequestAnAppointmentComponent', () => {
  let component: RequestAnAppointmentComponent;
  let fixture: ComponentFixture<RequestAnAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAnAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAnAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
