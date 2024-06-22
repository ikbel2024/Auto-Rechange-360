import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountProductComponent } from './count-product.component';

describe('CountProductComponent', () => {
  let component: CountProductComponent;
  let fixture: ComponentFixture<CountProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
