import { Component, OnInit } from '@angular/core';
import { Pagination } from '../components/pagination';
import { ViolationsService } from './violations.service'
import { ViolationOverviewComponent } from './violation-overview';


@Component({
  selector: 'violations',
  styleUrls: [ 'violations.scss' ],
  templateUrl: 'violations.html',
  providers: [ ViolationsService ]
})
export class ViolationsComponent implements OnInit {
  violations: any = [];
  activeViolation: any = null;
  errorMessage;

  constructor(private violationsService: ViolationsService) {
  }

  ngOnInit() {
    this.violationsService
      .getViolations()
      .subscribe(
        violations => this.violations = violations,
        error =>  this.errorMessage = <any>error
      );
  }

  setActiveViolation(violation) {
    this.activeViolation = violation;
  }
}
