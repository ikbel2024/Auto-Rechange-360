import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeInfoComponent } from './commande-info.component';

describe('CommandeInfoComponent', () => {
  let component: CommandeInfoComponent;
  let fixture: ComponentFixture<CommandeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
