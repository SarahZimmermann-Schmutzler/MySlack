import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadResponsiveComponent } from './thread-responsive.component';

describe('ThreadResponsiveComponent', () => {
  let component: ThreadResponsiveComponent;
  let fixture: ComponentFixture<ThreadResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadResponsiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
