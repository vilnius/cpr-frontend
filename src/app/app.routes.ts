import { Routes, RouterModule } from '@angular/router';

import { DataResolver } from './app.resolver';
import {Home} from './home/home.component';
import {Index} from './index/index';
import {About} from './about';
import {LaneMap} from './lanemap/lanemap';
import {Login} from './login/login';
import {Penalties} from './penalties/penalties';
import {Whitelist} from './whitelist/whitelist';
import {Dashboard} from './dashboard/dashboard';

export const ROUTES: Routes = [
  { path: '', component: Index },
  { path: 'home', component: Home},
  { path: 'lane-map', component: LaneMap },
  { path: 'penalties', component: Penalties },
  { path: 'whitelist', component: Whitelist },
  { path: 'dashboard', component: Dashboard },
  { path: 'about', component: About },
  { path: 'login', component: Login },
  { path: '**', component: Index }
];
