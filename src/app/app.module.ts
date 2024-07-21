import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//material
import { TrackVehicleComponent } from './customer-panel/track-vehicle/track-vehicle.component';
import { AdminHomeComponent } from './admin-panel/admin-home/admin-home.component';
import { AddServiceComponent } from './admin-panel/admin-home/add-service/add-service.component';
import { ChangeStatusComponent } from './admin-panel/admin-home/change-status/change-status.component';
import { ServiceHistoryComponent } from './admin-panel/admin-home/service-history/service-history.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './user/login/register/register.component';
import { ViewServiceComponent } from './admin-panel/view-service/view-service.component';
import { EditServiceComponent } from './admin-panel/edit-service/edit-service.component';
import { ToastrModule } from 'ngx-toastr';
// import {CdkTableModule} from '@angular/cdk/table';
import { SelectUserComponent } from './select-user/select-user.component';
import { SidebarComponent } from './admin-panel/sidebar/sidebar.component';
import { AdminRegistrationComponent } from './admin-panel/admin-registration/admin-registration.component';
import { HeaderComponent } from './header/header.component';
import { AdminLoginComponent } from './admin-panel/admin-login/admin-login.component';
import { LogoutComponent } from './logout/logout.component';
import { GetServiceComponent } from './admin-panel/admin-home/get-service/get-service.component';
import { SearchServicePipe } from './filters/search-service.pipe';
import { ViewServiceDetailsComponent } from './admin-panel/admin-home/view-service-details/view-service-details.component';
import { NoDataFoundComponent } from './errors/no-data-found/no-data-found.component';
import { LoadingComponent } from './navigation/loading/loading.component';
import { DerviceSuccessComponent } from './customer-panel/dervice-success/dervice-success.component';
import { AuthInterceptor } from './guards/auth.interceptor';
//material
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TrackVehicleComponent,
    AdminHomeComponent,
    AddServiceComponent,
    ChangeStatusComponent,
    ServiceHistoryComponent,
    RegisterComponent,
    ViewServiceComponent,
    EditServiceComponent,
    SelectUserComponent,
    SidebarComponent,
    AdminRegistrationComponent,
    HeaderComponent,
    AdminLoginComponent,
    LogoutComponent,
    GetServiceComponent,
    SearchServicePipe,
    ViewServiceDetailsComponent,
    NoDataFoundComponent,
    LoadingComponent,
    DerviceSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    //material
    MatFormFieldModule,
    ],

  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
