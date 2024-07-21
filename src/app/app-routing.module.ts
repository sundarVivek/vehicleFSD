import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { TrackVehicleComponent } from './customer-panel/track-vehicle/track-vehicle.component';
import { AdminHomeComponent } from './admin-panel/admin-home/admin-home.component';
import { AddServiceComponent } from './admin-panel/admin-home/add-service/add-service.component';
import { ChangeStatusComponent } from './admin-panel/admin-home/change-status/change-status.component';
import { ServiceHistoryComponent } from './admin-panel/admin-home/service-history/service-history.component';
import { RegisterComponent } from './user/login/register/register.component';
import { ViewServiceComponent } from './admin-panel/view-service/view-service.component';
import { EditServiceComponent } from './admin-panel/edit-service/edit-service.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { AdminRegistrationComponent } from './admin-panel/admin-registration/admin-registration.component';
import { AdminLoginComponent } from './admin-panel/admin-login/admin-login.component';
import { LogoutComponent } from './logout/logout.component';
import { GetServiceComponent } from './admin-panel/admin-home/get-service/get-service.component';
import { DerviceSuccessComponent } from './customer-panel/dervice-success/dervice-success.component';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'select-user', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'track-vehicle/:id', component: TrackVehicleComponent,canActivate: [AuthGuard] },
  { path: 'success', component: DerviceSuccessComponent },
  { path: 'admin-home/:id', component: AdminHomeComponent,canActivate: [AuthGuard] },
  { path: 'admin-reg', component: AdminRegistrationComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'change-status/:id', component: ChangeStatusComponent },
  { path: 'view-service-details/:id', component: ChangeStatusComponent },
  { path: 'get-service', component: GetServiceComponent },
  { path: 'service-history', component: ServiceHistoryComponent },
  { path: 'view-service', component: ViewServiceComponent },
  { path: 'view-service/:id', component: ViewServiceComponent },
  { path: 'edit-service/:id', component: EditServiceComponent },
  { path: 'select-user', component: SelectUserComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'header', component: HeaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
