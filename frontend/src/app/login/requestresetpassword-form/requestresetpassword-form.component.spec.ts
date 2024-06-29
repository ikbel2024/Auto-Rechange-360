import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestresetpasswordFormComponent } from './requestresetpassword-form.component';

describe('RequestresetpasswordFormComponent', () => {
  let component: RequestresetpasswordFormComponent;
  let fixture: ComponentFixture<RequestresetpasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestresetpasswordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestresetpasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
