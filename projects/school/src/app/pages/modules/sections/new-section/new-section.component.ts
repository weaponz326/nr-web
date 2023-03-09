import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { SectionFormComponent } from '../section-form/section-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectTermComponent } from '../../../select-windows/terms-windows/select-term/select-term.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { SectionsApiService } from 'projects/school/src/app/services/modules-api/sections-api/sections-api.service';

import { Section } from 'projects/school/src/app/models/modules/sections/sections.model';


@Component({
  selector: 'app-new-section',
  templateUrl: './new-section.component.html',
  styleUrls: ['./new-section.component.scss']
})
export class NewSectionComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private sectionsApi: SectionsApiService
  ) { }

  @ViewChild('sectionFormComponentReference', { read: SectionFormComponent, static: false }) sectionForm!: SectionFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectTermComponentReference', { read: SelectTermComponent, static: false }) selectTerm!: SelectTermComponent;

  navHeading: any[] = [
    { text: "New Section", url: "/home/sections/new-section" },
  ];

  isSectionSaving = false;

  ngOnInit(): void {
    this.getNewSectionCodeConfig();
  }

  ngAfterViewInit(): void {
    let activeTerm = JSON.parse(String(localStorage.getItem('schoolActiveTerm')));
    
    this.sectionForm.selectedTermId = activeTerm.term.id
    this.sectionForm.sectionForm.controls.term.setValue(activeTerm.term.term_name);
  }

  postSection(){
    let data: Section = {
      account: this.customCookie.getCookie('school_id') as string,
      section_code: this.sectionForm.sectionForm.controls.sectionCode.value as string,
      section_name: this.sectionForm.sectionForm.controls.sectionName.value as string,
      terms: [this.sectionForm.selectedTermId],
    }

    this.isSectionSaving = true;

    this.sectionsApi.postSection(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          sessionStorage.setItem('school_section_id', res.id);
          this.router.navigateByUrl('/home/sections/view-section');
          this.isSectionSaving = true;
        },
        error: (err) => {
          console.log(err);
          this.isSectionSaving = true;
          this.connectionToast.openToast();
        }
      })
  }

  getNewSectionCodeConfig(){
    this.sectionsApi.getNewSectionCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code){
            this.sectionForm.sectionForm.controls.sectionCode.disable();
            this.sectionForm.sectionForm.controls.sectionCode.setValue(res.code);
          }
          else{
            this.sectionForm.sectionForm.controls.sectionCode.enable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }
  
}
