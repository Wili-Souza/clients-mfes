import { Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { ButtonComponent } from './components/button/button.component';
import { FieldComponent } from './components/field/field.component';

@Component({
  selector: 'app-root',
  imports: [CardComponent, FieldComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
