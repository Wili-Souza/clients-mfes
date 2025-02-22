import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

export interface Option {
  label: string;
  value: any;
}

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnChanges {
  @Input() value?: string;
  @Input() options: Option[] = [];
  @Output() readonly selection = new EventEmitter<any>();

  protected isActive: boolean = false;
  protected valueSelected: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    const valueChange = changes['value']?.currentValue;
    if (valueChange) {
      const option = this.options.find((op) => op.value === valueChange);
      if (option) this.onOptionSelected(option);
    }
  }

  onToggleOptions(): void {
    this.isActive = !this.isActive;
  }

  onOptionSelected(option: Option): void {
    this.valueSelected = option.label;
    this.selection.emit(option.value);
  }
}
