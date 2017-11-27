import { Directive, Component, OnInit, ElementRef, Input, HostListener, Renderer2, OnChanges } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from '../auth/http';

type DashboardSort = 'hostname' | 'live' | 'connected' | 'updatedAt' | 'uptime' | 'freemem' | 'temp' | 'vpnIp' | 'version' | 'createdAt';

const SORT_ASC_CLASS = 'sort-asc';
const SORT_DESC_CLASS = 'sort-desc';

@Component({
  styles: [`
    th {
      cursor: pointer;
    }
    .${SORT_ASC_CLASS}::after {
      content: '\\25BE';
      padding-left: 0.5em;
    }
    .${SORT_DESC_CLASS}::after {
      content: '\\25B4';
      padding-left: 0.5em;
    }
  `],
  templateUrl: 'dashboard.html',
})
export class DashboardComponent implements OnInit {
  public error: string;
  public piStatuses: any[];
  public sortedPiStatuses: any[];
  public sortBy: DashboardSort;
  public sortDirection: Number = -1;

  constructor(public http: AuthHttp) { }

  public ngOnInit() {
    this.getDashbaord();
  }

  public getDashbaord() {
    this.http.get('/api/pistatus')
      .map((res) => res.json())
      .subscribe(
        (data) => {
          if (data.length) {
            this.error = null;
            this.sortedPiStatuses = this.piStatuses = data;
            this.handleSort('hostname');
          } else {
            this.error = 'No PIs found';
          }
        },
        (err) => {
          this.error = 'Bad response from server';
        }
    );
  }

  public handleSort(key: DashboardSort) {
    if (this.sortBy === key) {
      this.sortDirection = -this.sortDirection;
      this.sortedPiStatuses.reverse();
    } else {
      this.sortBy = key;
      this.sortDirection = -1;
      this.sortedPiStatuses = this.sortedPiStatuses.sort((a, b) => {
        const x = a[key];
        const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
  }
}

@Directive({
  selector: '[sortBy]',
})
export class SortableColumnDirective implements OnChanges {
  @Input() private sortBy: DashboardSort;
  @Input() private currentSort: DashboardSort;
  @Input() private currentDirection: Number;

  constructor(private parent: DashboardComponent, private el: ElementRef, private renderer: Renderer2) {}

  public ngOnChanges() {
    if (this.currentSort === this.sortBy) {
      if (this.currentDirection > 0) {
        this.renderer.addClass(this.el.nativeElement, SORT_ASC_CLASS);
        this.renderer.removeClass(this.el.nativeElement, SORT_DESC_CLASS);
      } else {
        this.renderer.removeClass(this.el.nativeElement, SORT_ASC_CLASS);
        this.renderer.addClass(this.el.nativeElement, SORT_DESC_CLASS);
      }

    } else {
      this.renderer.removeClass(this.el.nativeElement, SORT_ASC_CLASS);
      this.renderer.removeClass(this.el.nativeElement, SORT_DESC_CLASS);
    }
  }

  @HostListener('click', ['$event'])
  private sort(event: Event) {
    this.parent.handleSort(this.sortBy);
  }
}
