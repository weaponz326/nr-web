import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register(e: any){
    e.preventDefault();

    if(!localStorage.getItem('personal_id')){
      this.router.navigateByUrl('/auth/signup')
    }
    else{
      try{
        this.router.navigateByUrl('register');
      }
      catch{
        console.log('where u thinking of going? ...huh?');
      }
    }
  }

}
