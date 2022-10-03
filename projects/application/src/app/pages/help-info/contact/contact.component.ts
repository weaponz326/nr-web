import { Component, Input, OnInit } from '@angular/core';

import { SupportApiService } from 'projects/personal/src/app/services/support-api/support-api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private supportApi: SupportApiService) { }

  @Input() suiteName: string = "";

  name: string = "";
  email: string = "";
  message: string = "";

  isSending: boolean = false;
  isSubmitted: boolean = false;
  isFieldEmpty: boolean = false;

  ngOnInit(): void {
  }

  onSubmit() {
    let data = {
      name: this.name,
      email: this.email,
      message: this.message,
      source: this.suiteName
    }

    console.log(data);

    if(this.name != "" && this.email != "" && this.message != ""){
      this.isFieldEmpty = false;
      this.isSending = true;

      this.supportApi.postSupport(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isSubmitted = true;
            this.isSending = false;
          },
          error: (err) => {
            this.isFieldEmpty = true;
            this.isSending = false;
            console.log(err);
          }
        })
    }
    else{
      this.isFieldEmpty = true;
    }
  }

  resetForm(){
    this.name = "";
    this.email = "";
    this.message = "";
  }

}
