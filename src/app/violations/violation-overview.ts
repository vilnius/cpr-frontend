import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ViolationsService } from './violations.service'

@Component({
  selector: 'violation-overview',
  styleUrls: [ './violations.scss' ],
  templateUrl: 'violation-overview.html',
})
export class ViolationOverviewComponent implements OnInit {
  @Input() violation: any = null;

  constructor(private violationsService: ViolationsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.violation) {
      return;
    }

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

  resetForm(f: NgForm) {
    f.form.reset();
  }

  saveViolation(f: NgForm) {
    this.violationsService.saveViolation(this.violation).subscribe(
      response => {
        console.log("SAVED", response);
        f.form.markAsPristine();
      },
      err => this.logError(err)
    );
  }

  logError(err) {
    console.error(err);
  }

}
