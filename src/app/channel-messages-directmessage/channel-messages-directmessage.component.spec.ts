import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelMessagesDirectmessageComponent } from './channel-messages-directmessage.component';

describe('ChannelMessagesDirectmessageComponent', () => {
  let component: ChannelMessagesDirectmessageComponent;
  let fixture: ComponentFixture<ChannelMessagesDirectmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelMessagesDirectmessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelMessagesDirectmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
