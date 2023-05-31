import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeAnimationComponent } from './welcome-animation/welcome-animation.component';
import { PasswordComponent } from './password/password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth, Auth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChannelMessagesComponent } from './channel-messages/channel-messages.component';
import { ThreadsComponent } from './threads/threads.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { PrivateMessagesComponent } from './private-messages/private-messages.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { ServiceService } from './service.service';
import { ResponsiveNewUserComponent } from './responsive-new-user/responsive-new-user.component';
import { WsChannelComponent } from './ws-channel/ws-channel.component';
import { WsPrivateComponent } from './ws-private/ws-private.component';
import { WsDirectComponent } from './ws-direct/ws-direct.component';
import { WsChannelResponsiveComponent } from './ws-channel-responsive/ws-channel-responsive.component';
import { WsPmResponsiveComponent } from './ws-pm-responsive/ws-pm-responsive.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    WelcomeAnimationComponent,
    PasswordComponent,
    NewPasswordComponent,
    SidenavComponent,
    ChannelMessagesComponent,
    ThreadsComponent,
    FooterComponent,
    DirectMessagesComponent,
    PrivateMessagesComponent,
    ImpressumComponent,
    DatenschutzComponent,
    ResponsiveNewUserComponent,
    WsChannelComponent,
    WsPrivateComponent,
    WsDirectComponent,
    WsChannelResponsiveComponent,
    WsPmResponsiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    FormsModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
