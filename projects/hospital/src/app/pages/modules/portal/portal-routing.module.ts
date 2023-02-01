import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortalPage } from './portal.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewRinkComponent } from './new-rink/new-rink.component';
import { SearchViewComponent } from './search-view/search-view.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ViewRinkComponent } from './view-rink/view-rink.component';

// import { SendRinkGuard } from '../../../guards/modules/portal/send-rink/send-rink.guard';
// import { ViewRinkGuard } from '../../../guards/modules/portal/view-rink/view-rink.guard';

const routes: Routes = [
  {
    path: "",
    component: PortalPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "timeline", component: TimelineComponent },
      { path: "new-rink", component: NewRinkComponent },
      // { path: "new-rink", component: NewRinkComponent, canActivate: [SendRinkGuard] },
      { path: "search", component: SearchViewComponent },
      { path: "view-rink", component: ViewRinkComponent },
      // { path: "view-rink", component: ViewRinkComponent, canActivate: [ViewRinkGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
