import { Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { ButtonComponent } from './components/button/button.component';
import { FieldComponent } from './components/field/field.component';
import { SelectComponent } from './components/select/select.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@Component({
  selector: 'app-root',
  imports: [
    CardComponent,
    FieldComponent,
    ButtonComponent,
    SelectComponent,
    PaginatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
