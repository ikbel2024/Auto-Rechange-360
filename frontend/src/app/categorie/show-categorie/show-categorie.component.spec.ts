import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCategorieComponent } from './show-categorie.component';

describe('ShowCategorieComponent', () => {
  let component: ShowCategorieComponent;
  let fixture: ComponentFixture<ShowCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
