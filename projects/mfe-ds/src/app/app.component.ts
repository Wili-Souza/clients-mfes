import { Component } from '@angular/core';
import { FieldComponent } from "./components/field/field.component";

@Component({
  selector: 'app-root',
  imports: [FieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
