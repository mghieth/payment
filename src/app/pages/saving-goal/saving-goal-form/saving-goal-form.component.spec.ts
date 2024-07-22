import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingGoalFormComponent } from './saving-goal-form.component';

describe('SavingGoalFormComponent', () => {
  let component: SavingGoalFormComponent;
  let fixture: ComponentFixture<SavingGoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingGoalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
