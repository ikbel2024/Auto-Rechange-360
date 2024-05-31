import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCategorieComponent } from './search-categorie.component';

describe('SearchCategorieComponent', () => {
  let component: SearchCategorieComponent;
  let fixture: ComponentFixture<SearchCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
