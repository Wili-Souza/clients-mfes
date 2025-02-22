import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) name?: string;
  @Input({ required: true }) salary?: number;
  @Input({ required: true }) companyValuation?: number;
  @Input() readonly: boolean = true;

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() unselect = new EventEmitter<void>();
}
