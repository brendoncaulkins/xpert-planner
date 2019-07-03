import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-error',
  template: `
    <div fxFill>
      <h1>Error!</h1>
      <span class="redirect-text">
        That route doesn't exist. Why not head <a routerLink="/">home</a>?
      </span>
    </div>
  `,
  styles: [
    `
      .redirect-text {
        text-align: center;
      }
    `,
  ],
})
export class ErrorComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
