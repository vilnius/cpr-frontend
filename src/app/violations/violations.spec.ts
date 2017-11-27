import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MockBackend } from '@angular/http/testing';
import { FormBuilder } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';

import { AppState } from '../app.service';
import { AuthHttp } from '../auth/http';
import { IsoDatePipe } from '../pipes/iso-date';
import { Violation } from './models';
import { ViolationsComponent } from './violations';
import { ViolationOverviewComponent } from './violation-overview';
import { ViolationsService } from './violations.service';

const violation1 = <Violation> {
  plate: 'PLATE1',
  shotAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  images: ['PLATE1_IMG1', 'PLATE1_IMG2'],
  location: {
    gps: {
      lat: 10.20,
      lon: 30.40
    }
  }
};

const VIOLATIONS = Observable.of([violation1]);

class ViolationsServiceStub {
  public getViolations = () => VIOLATIONS;
}

class MockActivatedRoute {
  public params = Observable.of({id: 'VIOLATIONID1'});
}

describe(`Violations`, () => {
  let comp: ViolationsComponent;
  let fixture: ComponentFixture<ViolationsComponent>;
  let violationsService: ViolationsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [
        ViolationsComponent,
        IsoDatePipe,
        ViolationOverviewComponent
      ],
      providers: [
        FormBuilder,
        {
          provide: ViolationsService,
          useClass: ViolationsServiceStub
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationsComponent);
    violationsService = TestBed.get(ViolationsService);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch violations on init', () => {
    spyOn(violationsService, 'getViolations').and.returnValue(VIOLATIONS);
    comp.ngOnInit();
    expect(violationsService.getViolations).toHaveBeenCalled();
  });

  it('should have no active violation initially', () => {
    expect(comp.activeViolation).toBeNull();
  });

});
