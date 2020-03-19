import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatIconModule
} from '@angular/material';

import { AppStoreObj, AppEffectsList } from './stores/app.store';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { NavbarComponent } from './components/fragments/navbar/navbar.component';
import { FooterComponent } from './components/fragments/footer/footer.component';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';
import { SigninPageComponent } from './components/pages/signin-page/signin-page.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';
import { ClientService } from './services/client/client.service';
import { GetService } from './services/client/get.service';
import { PostService } from './services/client/post.service';
import { PutService } from './services/client/put.service';
import { DeleteService } from './services/client/delete.service';
import { UserSettingsFragmentComponent } from './components/fragments/user-page/user-settings-fragment/user-settings-fragment.component';
import { UserHomeFragmentComponent } from './components/fragments/user-page/user-home-fragment/user-home-fragment.component';
import { UserIconFragmentComponent } from './components/fragments/user-page/user-icon-fragment/user-icon-fragment.component';
import { UserAuthGuard } from './guards/auth.guard';
import { SignedInGuard } from './guards/signed-in.guard';
import { SignedOutGuard } from './guards/signed-out.guard';
import { UserLocationPreferencesFragmentComponent } from './components/fragments/user-page/user-location-preferences-fragment/user-location-preferences-fragment.component';
import { UserHomeListingsFragmentComponent } from './components/fragments/user-page/user-home-listings-fragment/user-home-listings-fragment.component';
import { UserNotificationsFragmentComponent } from './components/fragments/user-page/user-notifications-fragment/user-notifications-fragment.component';
import { UserRatingsFragmentComponent } from './components/fragments/user-page/user-ratings-fragment/user-ratings-fragment.component';
import { UserMessagesFragmentComponent } from './components/fragments/user-page/user-messages-fragment/user-messages-fragment.component';
import { UserTenantRequestsFragmentComponent } from './components/fragments/user-page/user-tenant-requests-fragment/user-tenant-requests-fragment.component';
import { UserHomeRequestsFragmentComponent } from './components/fragments/user-page/user-home-requests-fragment/user-home-requests-fragment.component';
import { UserPasswordFragmentComponent } from './components/fragments/user-page/user-password-fragment/user-password-fragment.component';
import { UserCreateHomeListingFragmentComponent } from './components/fragments/user-page/user-create-home-listing-fragment/user-create-home-listing-fragment.component';
import { HomeListingFormFragmentComponent } from './components/fragments/home-listing-form-fragment/home-listing-form-fragment.component';
import { HomeListingPageComponent } from './components/pages/home-listing-page/home-listing-page.component';
import { UserHomeListingFragmentComponent } from './components/fragments/user-page/user-home-listing-fragment/user-home-listing-fragment.component';
import { HomeListingFragmentComponent } from './components/fragments/home-listing-fragment/home-listing-fragment.component';
import { UserFullNamePipe } from './pipes/user-full-name.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { NotificationActionPipe } from './pipes/notification-action.pipe';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { PasswordResetPageComponent } from './components/pages/password-reset-page/password-reset-page.component';
import { VerifyAccountPageComponent } from './components/pages/verify-account-page/verify-account-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavbarComponent,
    FooterComponent,
    SignupPageComponent,
    SigninPageComponent,
    UserPageComponent,
    UserSettingsFragmentComponent,
    UserHomeFragmentComponent,
    UserIconFragmentComponent,
    UserLocationPreferencesFragmentComponent,
    UserHomeListingsFragmentComponent,
    UserNotificationsFragmentComponent,
    UserRatingsFragmentComponent,
    UserMessagesFragmentComponent,
    UserTenantRequestsFragmentComponent,
    UserHomeRequestsFragmentComponent,
    UserPasswordFragmentComponent,
    UserCreateHomeListingFragmentComponent,
    HomeListingFormFragmentComponent,
    HomeListingPageComponent,
    UserHomeListingFragmentComponent,
    HomeListingFragmentComponent,
    UserFullNamePipe,
    PhonePipe,
    NotificationActionPipe,
    AboutPageComponent,
    ContactPageComponent,
    PasswordResetPageComponent,
    VerifyAccountPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    StoreModule.forRoot(AppStoreObj),
    EffectsModule.forRoot(AppEffectsList),
    // FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  entryComponents: [],
  providers: [
    DatePipe,
    HttpClient,
    ClientService,
    GetService,
    PostService,
    PutService,
    DeleteService,
    UserAuthGuard,
    SignedInGuard,
    SignedOutGuard
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
