import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-menu',
  template: `
      <ion-navbar color="trim">
        <button ion-button menuToggle color="primary">
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>{{ pageName }}</ion-title>
      </ion-navbar>
  `
})
export class HeaderMenuComponent {
  @Input() pageName: string;
}
