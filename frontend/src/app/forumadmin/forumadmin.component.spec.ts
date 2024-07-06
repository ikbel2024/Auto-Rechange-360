import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumadminComponent } from './forumadmin.component';

describe('ForumadminComponent', () => {
  let component: ForumadminComponent;
  let fixture: ComponentFixture<ForumadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
