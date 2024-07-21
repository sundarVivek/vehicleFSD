import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddService } from 'src/app/add.service';

@Component({
  selector: 'app-get-service',
  templateUrl: './get-service.component.html',
  styleUrls: ['./get-service.component.scss']
})
export class GetServiceComponent {
  getServiceForm!: FormGroup;
  id: any;
  user:any;
  data:any;
  serviceId: any;
  vehicleNo: any;
  owner: any;
  model: any;
  date: any;
  contact: any;
  serviceType: any;
  getId:any;
  updatedResult:any;
  constructor(private addService: AddService, private route: Router, private fb: FormBuilder) { }
  ngOnInit() {
    this.getServiceForm = this.fb.group({
      vehicleNo: ['', Validators.required],
      customer_name: ['', Validators.required],
    }
    );
    this.getServiceForm.controls?.['customer_name'].valueChanges.subscribe((value: string) => {
      // Update the form control with the lowercase value
      this.getServiceForm.controls?.['customer_name'].setValue(value.toLowerCase(), { emitEvent: false });
    });
  }
  receiveDataFromChangeStatus(changeStatusData: any) {
    console.log("change s",changeStatusData);
  }
  onSubmit() {
    this.addService.getVehicleService().subscribe(
      (result: any) => {
       const user:any= result.find((a: any) => {
         return a.vehicleNo == this.getServiceForm.value.vehicleNo && a.customer_name == this.getServiceForm.value.customer_name;
        });
        if(user){
          this.data=user;
          this.id=this.data.id;
          this.serviceId = result.id;
          this.vehicleNo = result.vehicleNo;
          this.owner = result.customer_name;
          this.model = result.model_name;
          this.date = result.appointment_date;
          this.contact = result.contact;
          this.serviceType = result.service_type;
          console.log(this.id);
               this.route.navigate(['/change-status', this.id]);
         }
      },
     
    ),
    (error:any)=>{
      console.log(error);
    }

  }
  
}
