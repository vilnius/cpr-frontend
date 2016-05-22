// App
export * from './app.component';
export * from './app.service';

import {Authentication} from './services/authentication';
import {AppState} from './app.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  Authentication,
];
