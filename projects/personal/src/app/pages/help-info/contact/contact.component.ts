import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

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

      // TODO:
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
