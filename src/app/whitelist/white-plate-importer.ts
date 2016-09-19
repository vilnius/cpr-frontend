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
export class WhitePlateImporter {
  @Input() onPlateImported: Function;
  filesToUpload: Array<File>;

  constructor(public http: Http) {
    this.filesToUpload = [];
  }
  ngOnInit() {
  }
  logError(err) {
    console.error('There was an error: ' + err);
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }
  importWhitelist() {
    this.makeFileRequest('/api/whitelist/upload', [], this.filesToUpload).then((result) => {
      this.onPlateImported();
    }, (error) => {
        console.error(error);
    });
  }
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        let formData: any = new FormData();
        let xhr = new XMLHttpRequest();
        for (let i = 0; i < files.length; i++) {
            formData.append('uploads', files[i], files[i].name);
        }
        let requestfinished = 4;
        xhr.onreadystatechange = function () {
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
