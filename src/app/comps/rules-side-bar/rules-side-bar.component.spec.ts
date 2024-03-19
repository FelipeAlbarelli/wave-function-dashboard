import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesSideBarComponent } from './rules-side-bar.component';

describe('RulesSideBarComponent', () => {
  let component: RulesSideBarComponent;
  let fixture: ComponentFixture<RulesSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RulesSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
