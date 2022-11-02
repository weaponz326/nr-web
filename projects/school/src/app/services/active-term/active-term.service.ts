import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveTermService {

  constructor() { }

  public setActiveTerm(data: any){
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
