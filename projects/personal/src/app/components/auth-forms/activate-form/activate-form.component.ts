import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthApiService } from '../../../services/auth/auth-api/auth-api.service';


@Component({
  selector: 'app-activate-form',
  templateUrl: './activate-form.component.html',
  styleUrls: ['./activate-form.component.scss']
})
export class ActivateFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authApi: AuthApiService
  ) { }

  isActivated = true;
  queryParams: any;

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams(){
    this.route.queryParams
      .subscribe(params => {
        console.log(params);

        this.queryParams = {
          uid: this.route.snapshot.queryParamMap.get('uid'),
          token: this.route.snapshot.queryParamMap.get('token')
        }
      });

    this.postActivateAccount()
  }

  postActivateAccount(){
    console.log(this.queryParams);

    this.authApi.postActivateAccount(this.queryParams)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isActivated = true;
        },
        error: (err) => {
          console.log(err);
          this.isActivated = false;
        }
      })
  }

}
