import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

/**
 * Load the implementations that should be tested
 */
import { AppComponent } from './app.component';
import { AppState } from './app.service';
import { AuthService } from './auth/auth.service';

class MockAuthService {
  public loggedIn = () => true;
}

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        AppState,
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
    })
    /**
     * Compile template and css
     */
    .compileComponents();
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be properly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should be Car Plate Reader`, () => {
    expect(comp.name).toEqual('Car Plate Reader');
  });

});
