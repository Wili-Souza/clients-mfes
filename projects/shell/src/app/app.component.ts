import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shell-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
