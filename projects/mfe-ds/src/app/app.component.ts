import { Component } from '@angular/core';
import { FieldComponent } from "./components/field/field.component";
import { ButtonComponent } from './components/button/button.component';

@Component({
  selector: 'app-root',
  imports: [FieldComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
