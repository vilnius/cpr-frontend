import { Component, Input } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'white-plate-importer',
  template: `
    <div class="pull-right importer">
      <input type="file" (change)="fileChangeEvent($event)" placeholder="Import file..." />
      <button (click)="importWhitelist()" class="btn btn-primary">Import whitelist</button>
      <p *ngIf="message" class="text-success">{{message}}</p>
      <p *ngIf="error" class="text-danger">{{error}}</p>
    </div>
  `,
  styles: [`
    .importer {
      padding-bottom: 10px;
      text-align: right;
    }
    input {
      display: inline-block;
    }
  `]
})
export class WhitePlateImporterComponent {
  @Input() public onPlateImported: Function;
  public filesToUpload: File[];
  public message: string;
  public error: string;

  constructor(public http: Http) {
    this.filesToUpload = [];
  }

  public logError(err) {
    console.error('There was an error: ' + err);
  }

  public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File[]> fileInput.target.files;
  }

  public importWhitelist() {
    this.message = this.error = '';
    this.makeFileRequest('/api/whitelist/upload', [], this.filesToUpload).subscribe(
      (result) => {
        this.message = `Total plate numbers: ${result.total}.
          Imported: ${result.imported}. New: ${result.new}`;
        this.onPlateImported();
      },
      (err) => {
        this.error = 'Import failed: ' + err;
        return Observable.throw(err);
      }
    );
  }

  public makeFileRequest(url: string, params: string[], files: File[]) {
    let formData: any = new FormData();
    for (let file of files) {
        formData.append('uploads', file, file.name);
    }
    return this.http.post(url, formData).map((res) => res.json());
  }
}
