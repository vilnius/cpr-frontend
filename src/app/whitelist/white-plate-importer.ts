import { Component, Input } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'white-plate-importer',
  template: `
    <div>
      <input type="file" (change)="fileChangeEvent($event)" placeholder="Import file..." />
      <button (click)="importWhitelist()" class="btn btn-primary">Import whitelist</button>
    </div>
  `
})
export class WhitePlateImporterComponent {
  @Input() onPlateImported: Function;
  filesToUpload: File[];

  constructor(public http: Http) {
    this.filesToUpload = [];
  }
  logError(err) {
    console.error('There was an error: ' + err);
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File[]> fileInput.target.files;
  }
  importWhitelist() {
    this.makeFileRequest('/api/whitelist/upload', [], this.filesToUpload).then((result) => {
      this.onPlateImported();
    }, (error) => {
        console.error(error);
    });
  }
  makeFileRequest(url: string, params: string[], files: File[]) {
    return new Promise((resolve, reject) => {
        let formData: any = new FormData();
        let xhr = new XMLHttpRequest();
        for (let file of files) {
            formData.append('uploads', file, file.name);
        }
        let requestfinished = 4;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === requestfinished) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        };
        xhr.open('POST', url, true);
        xhr.send(formData);
    });
  }
}
