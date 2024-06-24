import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageCategoryComponent } from './garage-category.component';

describe('GarageCategoryComponent', () => {
  let component: GarageCategoryComponent;
  let fixture: ComponentFixture<GarageCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarageCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
