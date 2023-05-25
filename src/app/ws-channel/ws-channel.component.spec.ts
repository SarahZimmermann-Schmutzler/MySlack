import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsChannelComponent } from './ws-channel.component';

describe('WsChannelComponent', () => {
  let component: WsChannelComponent;
  let fixture: ComponentFixture<WsChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
