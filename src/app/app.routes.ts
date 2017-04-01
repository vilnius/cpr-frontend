import { Routes, RouterModule } from '@angular/router';

import { DataResolver } from './app.resolver';
import { IndexComponent } from './index/index';
import { AboutComponent } from './about';
import { LoginComponent } from './login/login';
import { PenaltiesComponent } from './penalties/penalties';
import { PenaltyOverviewComponent } from './penalties/penalty-overview';
import { WhitelistComponent } from './whitelist/whitelist';
import { DashboardComponent } from './dashboard/dashboard';
import { LaneMapComponent } from './lanemap/lanemap';

export const ROUTES: Routes = [
  { path: '', component: IndexComponent },
  { path: 'lane-map', component: LaneMapComponent },
  { path: 'penalties', component: PenaltiesComponent },
  { path: 'penalties/:id', component: PenaltyOverviewComponent },
  { path: 'whitelist', component: WhitelistComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: IndexComponent }
];
