import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export type InputType = 'text' | 'number' | 'password';
export type InputSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-field',
  imports: [ReactiveFormsModule],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
})
export class FieldComponent {
  @Input() type: InputType = 'text';
  @Input() placeholder?: string;
  @Input() control: FormControl = new FormControl();
  @Input() size: InputSize = 'medium';
}
