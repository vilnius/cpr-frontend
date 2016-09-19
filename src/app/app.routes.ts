import { Routes, RouterModule } from '@angular/router';

import { DataResolver } from './app.resolver';
import { Index } from './index/index';
import { About } from './about';
import { Login } from './login/login';
import { Penalties } from './penalties/penalties';
import { Whitelist } from './whitelist/whitelist';
import { Dashboard } from './dashboard/dashboard';
import { LaneMap } from './lanemap/lanemap';

export const ROUTES: Routes = [
  { path: '', component: Index },
  { path: 'lane-map', component: LaneMap },
  { path: 'penalties', component: Penalties },
  { path: 'whitelist', component: Whitelist },
  { path: 'dashboard', component: Dashboard },
  { path: 'about', component: About },
  { path: 'login', component: Login },
  { path: '**', component: Index }
];
