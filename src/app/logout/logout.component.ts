import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddService } from '../add.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  isOpen: boolean = false;
  modalComponent: any;
  username:string='';
  id:any;
  constructor(private route: Router, private addservice:AddService,
    private router:ActivatedRoute) { }
  ngOnInit() {

  }
  yes() {
   this.addservice.signOut();
    this.route.navigate(['/select-user'])
  }

  openModal(): void {
    const modal = document.getElementById('myModal');
    if (modal != null) {
      modal.style.display = 'block';
      modal.style.marginTop = '200px';
      modal.style.marginLeft = '450px';
    }

  }

  closeModal(): void {
    const modal = document.getElementById('myModal');
    if (modal != null) {
      modal.style.display = 'none';
    }

  }
}
