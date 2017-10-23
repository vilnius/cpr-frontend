import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ViolationsService } from './violations.service';
import { Violation, ViolationStatus } from './models';

@Component({
  selector: 'violation-overview',
  styleUrls: [ './violations.scss' ],
  templateUrl: 'violation-overview.html',
})
export class ViolationOverviewComponent implements OnInit, OnChanges {
  @Input() violation: any = null;
  @Output() violationChanged = new EventEmitter<any>();
  violationForm: FormGroup;
  statuses = Object.keys(ViolationStatus);

  constructor(
    private violationsService: ViolationsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.violationForm = this.fb.group({
      plate: '',
      status: ViolationStatus.NEW,
      witness: this.fb.group({
        firstName: '',
        lastName: ''
      }),
      notes: '',
    });
  }

  ngOnInit() {
    this.route.params
      .filter((params: Params) => 'id' in params)
      .switchMap((params: Params) => this.violationsService.getViolation(params['id']))
      .subscribe(
        data => {
          this.violation = data;
        },
        err => this.logError(err)
      );
  }

  ngOnChanges() {
    if (!this.violation) {
      return;
    }

    this.violationForm.reset({
      plate: this.violation.plate,
      status: this.violation.status,
      witness: {
        firstName: this.violation.witness.firstName || '',
        lastName: this.violation.witness.lastName || ''
      },
      notes: this.violation.notes,
    });
  }

  resetForm() {
    this.ngOnChanges();
  }

  prepareSaveViolation(): Violation {
    const saveViolation: Violation = {
      ...this.violation,
      ...this.violationForm.value
    };
    return saveViolation;
  }

  saveViolation() {
    this.violationsService.saveViolation(this.prepareSaveViolation()).subscribe(
      response => {
        this.violationChanged.emit(response);
      },
      err => this.logError(err)
    );
  }

  logError(err) {
    console.error(err);
  }

}
