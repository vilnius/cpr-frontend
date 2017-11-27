import { Component } from '@angular/core';

@Component({
  selector: 'index',
  styles: [`
    img {
      position: fixed;
      top: 0;
      width: 100%;
    }
  `],
  template: `<img [src]="codeForVilniusLogo">`
})
export class IndexComponent {
  public codeForVilniusLogo = 'assets/img/c4v-logo.jpeg';
}
