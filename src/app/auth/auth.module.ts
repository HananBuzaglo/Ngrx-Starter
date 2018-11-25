import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from '../auth/state/auth.reducer';
import { RouterModule } from '@angular/router';
import { AuthEffects } from './state/auth.effects';
import { SigninComponent } from './pages/signin/signin.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';


@NgModule({
  declarations: [SigninComponent, RegistrationComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild([
      { path: 'signin', component: SigninComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: 'register', component: RegistrationComponent },
    ])
  ]
})
export class AuthModule { }
