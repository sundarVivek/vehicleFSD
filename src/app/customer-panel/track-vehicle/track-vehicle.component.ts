import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AddService } from 'src/app/add.service';

@Component({
  selector: 'app-track-vehicle',
  templateUrl: './track-vehicle.component.html',
  styleUrls: ['./track-vehicle.component.scss'],
  animations: [
    trigger('blinkAnimation', [
      state('true', style({})),
      state('false', style({})),
      transition('false <=> true', animate('1s ease-in-out', keyframes([
        style({ visibility: 'hidden', offset: 0.5 }),
        style({ visibility: 'visible', offset: 1.0 })
      ]))),
    ],
    )],
})
export class TrackVehicleComponent {
  public isReadyForServiceBlinking: boolean = false;
  public isServiceInProgressBlinking: boolean = false;
  public isReadyForDeliveryBlinking: boolean = false;
  readyForService: number = 0;
  id: any;
  status: any;
  constructor(private route: Router, private router: ActivatedRoute, private service: AddService) { }
  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
    console.log(this.id)
    this.service.getVehicleServiceById(this.id).subscribe(
      (result) => {
        this.status = result.status;
        console.log(this.status);
        if(result.status==='Ready for service'){
          setInterval(() => {
            this.isReadyForServiceBlinking = !this.isReadyForServiceBlinking;
          }, 1000);
        }else if(result.status==='Service in progress'){
          setInterval(() => {
            this.isServiceInProgressBlinking = !this.isServiceInProgressBlinking;
          }, 1000);
        }else if(result.status==='Ready for delivery'){
          setInterval(() => {
            this.isReadyForDeliveryBlinking = !this.isReadyForDeliveryBlinking;
          }, 1000);
        }else{

        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}







