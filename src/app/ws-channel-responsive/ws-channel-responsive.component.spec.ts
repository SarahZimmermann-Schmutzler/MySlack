import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsChannelResponsiveComponent } from './ws-channel-responsive.component';

describe('WsChannelResponsiveComponent', () => {
  let component: WsChannelResponsiveComponent;
  let fixture: ComponentFixture<WsChannelResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsChannelResponsiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsChannelResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
