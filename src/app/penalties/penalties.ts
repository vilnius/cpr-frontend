import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GpsComponent } from './gps';

@Component({
  selector: 'penalties',
  templateUrl: 'penalties.html',
})
export class PenaltiesComponent implements OnInit {
  checkedForBulkAction: Array<number = [];
  penalties: any;

  constructor(public http: Http) {
  }

  ngOnInit() {
    this.getPenalties().publish().connect();
  }

  requestConfirm(message: string = 'Atlikti veiksmą?'): boolean {
    return confirm(message);
  }

  deleteBulk() {
    if (!this.requestConfirm('Ar tikrai norite ištrinti pažymėtus duomenis?')) {
      return;
    }

    console.log('I should delete ', this.checkedForBulkAction);

    this.http.delete('/api/penalties'/*, this.checkedForBulkAction */)
      .catch(err => alert('Ištrinimas nepavyko: ' + err))
      .flatMap(ok => this.getPenalties())
      .subscribe(
        data => {
          //
        },
        err => {
          this.logError(err)
        }
      );
  }

  isCheckedForBulkAction(id: number): boolean {
    return this.checkedForBulkAction.indexOf(id) !== -1;
  }

  // Adds id for bulk actions or removes if already in array
  pushForBulkAction(id: number): void {
    let chekedArr;

    chekedArr = this.checkedForBulkAction

    if (this.isCheckedForBulkAction(id)) {

      chekedArr.splice(id, 1);

    } else {

      chekedArr.push(id);

    }

  }

  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '');
  }

  getPenalties() {
    return this.http.get('/api/penalties')
      .catch(err => this.logError(err))
      .map(res => {
        res = res.json();
        this.penalties = res;
        return res;
      });
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

}
