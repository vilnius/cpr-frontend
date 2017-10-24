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
  @Input() public violation: any = null;
  @Output() public violationChanged = new EventEmitter<any>();
  public violationForm: FormGroup;
  public statuses = Object.keys(ViolationStatus);

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

  public ngOnInit() {
    this.route.params
      .filter((params: Params) => 'id' in params)
      .switchMap((params: Params) => this.violationsService.getViolation(params['id']))
      .subscribe(
        (responseOk) => {
          this.violation = responseOk;
        },
        (err) => this.logError(err)
      );
  }

  public ngOnChanges() {
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

  public resetForm() {
    this.ngOnChanges();
  }

  public prepareSaveViolation(): Violation {
    const saveViolation: Violation = {
      ...this.violation,
      ...this.violationForm.value
    };
    return saveViolation;
  }

  public saveViolation() {
    this.violationsService.saveViolation(this.prepareSaveViolation()).subscribe(
      (responseOk) => {
        this.violationChanged.emit(responseOk);
      },
      (err) => this.logError(err)
    );
  }

  public logError(err) {
    console.error(err);
  }

}
