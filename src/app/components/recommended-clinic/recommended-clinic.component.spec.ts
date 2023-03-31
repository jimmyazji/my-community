import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedClinicComponent as RecommendedClinicComponent } from './recommended-clinic.component';

describe('RecommendedClinicComponent', () => {
  let component: RecommendedClinicComponent;
  let fixture: ComponentFixture<RecommendedClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedClinicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
