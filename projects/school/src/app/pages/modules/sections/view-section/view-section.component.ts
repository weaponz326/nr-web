import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SectionFormComponent } from '../section-form/section-form.component';
import { SectionStudentsComponent } from '../section-students/section-students.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { SectionsApiService } from 'projects/school/src/app/services/modules-api/sections-api/sections-api.service';
// import { SectionsPrintService } from 'projects/school/src/app/services/printing/sections-print/sections-print.service';

import { Section } from 'projects/school/src/app/models/modules/sections/sections.model';


@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss']
})
export class ViewSectionComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private sectionsApi: SectionsApiService,
    // private sectionsPrint: SectionsPrintService
  ) { }

  @ViewChild('sectionFormComponentReference', { read: SectionFormComponent, static: false }) sectionForm!: SectionFormComponent;
  @ViewChild('sectionStudentsComponentReference', { read: SectionStudentsComponent, static: false }) sectionStudents!: SectionStudentsComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Sections", url: "/home/sections/all-sections" },
    { text: "View Section", url: "/home/sections/view-section" },
  ];

  sectionData: any;

  isSectionLoading = false;
  isSectionSaving = false;
  isSectionDeleting = false;

  ngOnInit(): void {
    this.getSection();
    this.getSectionCodeConfig();
  }

  getSection(){
    this.isSectionLoading = true;

    this.sectionsApi.getSection()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.sectionData = res;
          this.isSectionLoading = false;

          this.sectionForm.sectionForm.controls.sectionCode.setValue(this.sectionData.section_code);
          this.sectionForm.sectionForm.controls.sectionName.setValue(this.sectionData.section_name);

          this.sectionForm.selectedTermId = this.sectionData.term?.id;
          this.sectionForm.sectionForm.controls.term.setValue(this.sectionData.term?.term_name);
        },
        error: (err) => {
          console.log(err);
          this.isSectionLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putSection(){
    let data: Section = {
      account: this.customCookie.getCookie('school_id') as string,
      section_code: this.sectionForm.sectionForm.controls.sectionCode.value as string,
      section_name: this.sectionForm.sectionForm.controls.sectionName.value as string,
      terms: [this.sectionForm.selectedTermId],
    }

    console.log(data);
    this.isSectionSaving = true;

    this.sectionsApi.putSection(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.updateTerm();
        },
        error: (err) => {
          console.log(err);
          this.isSectionSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  updateTerm(){
    console.log('u are adding new term to term');

    // if (this.sectionData.terms.include({id: this.sectionForm.selectedTermId})){
    //   console.log('lets go ahead with term update');

    //   let data = {
    //     terms: {
    //       id: this.sectionForm.selectedTermId,
    //       data: arrayUnion(this.sectionForm.selectedTermData),
    //     }
    //   }

    //   this.sectionsApi.updateSection(data)
    //     .then(
    //       (res: any) => {
    //         console.log(res);
    //         this.isSectionSaving = false;
    //       },
    //       (err: any) => {
    //         console.log(err);
    //         this.isSectionSaving = false;
    //         this.connectionToast.openToast();
    //       }
    //     )
    // }
    // else{
    //   console.log('no need to update term');
    //   this.isSectionSaving = false;
    // }
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteSection(){
    this.isSectionDeleting = true;

    this.sectionsApi.deleteSection()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/sections/all-sections');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  getSectionCodeConfig(){
    this.sectionsApi.getSectionCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          
          if (res.entry_mode == "Auto")
            this.sectionForm.sectionForm.controls.sectionCode.disable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.sectionsPrint.printViewSection();
  }

}
