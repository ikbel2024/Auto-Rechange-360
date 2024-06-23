import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpassFormComponent } from './resetpass-form.component';

describe('ResetpassFormComponent', () => {
  let component: ResetpassFormComponent;
  let fixture: ComponentFixture<ResetpassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetpassFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetpassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
