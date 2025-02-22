import { Component } from '@angular/core';
import { CardComponent } from "./components/card/card.component";
import { ModalContainerComponent } from "./components/modal-container/modal-container.component";

@Component({
  selector: 'app-root',
  imports: [CardComponent, ModalContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
