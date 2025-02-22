// projects/mfe-ds/app/components/button/button.component.ts

import { Component, Input } from '@angular/core';

export type ButtonType = 'solid' | 'outline';
export type ButtonColor = 'orange';
export type ButtonSize = 'small' | 'medium' | 'large';

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
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
}
