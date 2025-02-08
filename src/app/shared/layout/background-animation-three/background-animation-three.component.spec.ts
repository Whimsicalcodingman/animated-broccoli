import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundAnimationThreeComponent } from './background-animation-three.component';

describe('BackgroundAnimationThreeComponent', () => {
  let component: BackgroundAnimationThreeComponent;
  let fixture: ComponentFixture<BackgroundAnimationThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundAnimationThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundAnimationThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
