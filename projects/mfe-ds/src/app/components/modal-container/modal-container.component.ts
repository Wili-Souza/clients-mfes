import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-container',
  imports: [],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
})
export class ModalContainerComponent {
  @Output() close = new EventEmitter();

  onClose(): void {
    this.close.emit();
  }
}
