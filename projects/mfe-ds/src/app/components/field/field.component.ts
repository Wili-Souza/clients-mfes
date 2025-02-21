import { Component, Input } from '@angular/core';

export type InputType = 'text' | 'number' | 'password';

@Component({
  selector: 'app-field',
  imports: [],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
})
export class FieldComponent {
  @Input() type: InputType = 'text';
  @Input() placeholder?: string;
}
