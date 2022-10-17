import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveTermService {

  constructor() { }

  public setActiveTerm(snapshotData: any){
    let data = {
      id: snapshotData.id,
      data: {
        term_code: snapshotData.data().term_code,
        term_name: snapshotData.data().term_name,
      }
    }

    console.log(data);

    const dataString = JSON.stringify(data);
    localStorage.setItem('schoolActiveTerm', dataString);
  }

  public getActiveTerm(){
    let data = JSON.parse(String(localStorage.getItem('schoolActiveTerm')));
    console.log(data);

    return data;
  }

}
