import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PdfPrintService } from 'projects/personal/src/app/services/module-utilities/pdf-print/pdf-print.service';
import { RosterApiService } from 'projects/restaurant/src/app/services/modules-api/roster-api/roster-api.service';


@Injectable({
  providedIn: 'root'
})
export class RosterPrintService {

  constructor() { }
}
