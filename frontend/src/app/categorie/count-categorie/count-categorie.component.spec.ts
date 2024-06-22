import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountCategorieComponent } from './count-categorie.component';

describe('CountCategorieComponent', () => {
  let component: CountCategorieComponent;
  let fixture: ComponentFixture<CountCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
