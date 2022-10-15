import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { SectionFormComponent } from '../section-form/section-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';
// import { SectionsApiService } from 'projects/school/src/app/services/modules/sections-api/sections-api.service';

// import { Section } from 'projects/school/src/app/models/modules/sections/sections.model';


@Component({
  selector: 'app-new-section',
  templateUrl: './new-section.component.html',
  styleUrls: ['./new-section.component.scss']
})
export class NewSectionComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private sectionsApi: SectionsApiService
  ) { }

  @ViewChild('sectionFormComponentReference', { read: SectionFormComponent, static: false }) sectionForm!: SectionFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "New Section", url: "/home/sections/new-section" },
  ];

  isSectionSaving = false;

  ngOnInit(): void {
  }

  createSection(){
    // let data: Section = {
    //   account: this.customCookie.getCookie('restaurant_id') as string,
    //   section_code: this.sectionForm.sectionForm.controls.sectionCode.value,
    //   section_name: this.sectionForm.sectionForm.controls.sectionName.value,
    //   terms: [this.sectionForm.selectedTermId],
    // }

    this.isSectionSaving = true;

    // this.sectionsApi.createSection(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       sessionStorage.setItem('school_section_id', res.id);
    //       this.router.navigateByUrl('/home/sections/view-section');
    //       this.isSectionSaving = true;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isSectionSaving = true;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

}
