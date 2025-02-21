// projects/mfe-ds/app/components/button/button.component.ts

import { Component, Input } from '@angular/core';

export type ButtonType = 'solid' | 'outline';
export type ButtonColor = 'orange';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: ButtonType = 'solid';
  @Input() color: ButtonColor = 'orange';
}
