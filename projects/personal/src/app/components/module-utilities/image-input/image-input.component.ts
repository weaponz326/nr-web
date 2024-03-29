import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent implements OnInit {

  constructor() { }

  @Input() imgType = "logo";
  @Input() height = 120;
  @Input() width = 120;

  image: any;
  imgSrc = '';

  isImageChanged = false;

  ngOnInit(): void {
    this.setPlaceholderImage();
  }

  setPlaceholderImage(){
    // this.imgSrc = '';
    console.log(this.imgType);

    if(this.imgType == 'photo'){
      this.imgSrc = 'assets/images/utilities/photo-avatar.jpg';
    }
    else if(this.imgType == 'logo'){
      this.imgSrc = 'assets/images/utilities/logo-placeholder.jpg';
    }
  }

  onImageSelected(e: any){
    this.image = e.target.files[0];
    console.log(this.image);

    if (this.image && this.image.size < 2097152) {
      var reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
        this.isImageChanged = true;
      }
    }
  }

}
