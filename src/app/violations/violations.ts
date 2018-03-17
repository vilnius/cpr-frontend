import { Component, OnInit } from '@angular/core';
// import { PaginationComponent } from '../components/pagination';
import { ViolationsService } from './violations.service';
import { ViolationOverviewComponent } from './violation-overview';
import { ViolationStatus } from './models';

@Component({
  selector: 'violations',
  styleUrls: [ 'violations.scss' ],
  templateUrl: 'violations.html'
})
export class ViolationsComponent implements OnInit {
  public violations: any = [];
  public activeViolation: any = null;
  public errorMessage;
  public ViolationStatus = ViolationStatus;

  constructor(private violationsService: ViolationsService) {}

  public ngOnInit() {
    this.violationsService
      .getViolations()
      .subscribe(
        (violations) => this.violations = violations,
        (err) => this.errorMessage = err
      );
  }

  public setActiveViolation(violation) {
    this.activeViolation = violation;
  }

  public handleViolationChanged(violation) {
    const index = this.violations.indexOf(this.activeViolation);
    if (index !== -1) {
      this.activeViolation = this.violations[index] = violation;
    }
  }
}
