import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddService } from 'src/app/add.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  adminLogin!: FormGroup;
  errorMessage: any;
  submitted=false;
  adminId:any;
  loading:boolean=false;
  constructor(private route: Router,
    private adminService: AdminService,
     private fb: FormBuilder,
    private toastr: ToastrService,
    private addService: AddService, ) { }
  ngOnInit() {
    this.adminLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  onSubmit() {
    this.submitted=true;
    this.loading=true;
    if (this.adminLogin.valid) {
      this.adminService.login(this.adminLogin.value).subscribe(
        (res: any) => {
          this.adminId=res.id;
          this.addService.storeToken(res.token);
          localStorage.setItem('role','admin');
          console.log(res);
          if (this.adminLogin.controls?.['username'].value==res.username&&
          this.adminLogin.controls?.['password'].value==res.password) {
            this.toastr.success('Login successful');
            this.route.navigate(['/admin-home',this.adminId])
          }
        },
        (error: any) => {
          // Handle error
          this.errorMessage = error.message;
          console.log(this.errorMessage);
        }
      )
      // this.adminService.getAdmin().subscribe((result: any) => {
      //   const admins: any = result.find((a: any) => {
      //     return a.username == this.adminLogin.value.username && a.password == this.adminLogin.value.password;
      //   })
      //   if (admins) {
      //     this.toastr.success('Login successful');
      //     this.route.navigate(['/admin-home'])
      //   } else {
      //     this.toastr.error('Login failed');
      //   }
      // },
      //   (error: any) => {
      //     // Handle error
      //     this.errorMessage = error.message;
      //     console.log(this.errorMessage);
      //   }
      // );
    }
  }

}
