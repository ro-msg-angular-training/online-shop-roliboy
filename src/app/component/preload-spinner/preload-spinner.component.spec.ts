import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadSpinnerComponent } from './preload-spinner.component';

describe('PreloadSpinnerComponent', () => {
  let component: PreloadSpinnerComponent;
  let fixture: ComponentFixture<PreloadSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloadSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
