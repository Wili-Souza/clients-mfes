import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, ClickOutsideDirective],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Input() active: boolean = false;
  @Output() activeChange = new EventEmitter<boolean>();

  onClickOutside(): void {
    this.activeChange.emit(false);
  }
}
