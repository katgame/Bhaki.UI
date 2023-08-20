import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AllBranchesComponent } from './branches-all.component';

describe('AllBranchesComponent', () => {
  let component: AllBranchesComponent;
  let fixture: ComponentFixture<AllBranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
