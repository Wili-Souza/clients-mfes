import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shell-root',
  imports: [RouterModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly http = inject(HttpClient);

  constructor() {
    this.loadFontFromDesignSystem();
  }

  loadFontFromDesignSystem(): void {
    this.http.get('config.json').subscribe({
      next: (data: any) => {
        const assetsUrl = data.assetsUrl as string;
        const fontStyle = document.createElement('style');
        fontStyle.appendChild(
          document.createTextNode(
            `@font-face {
              font-family: 'Inter';
              src: url('"${assetsUrl}'/fonts/Inter-VariableFont_opsz,wght.ttf") format("truetype");\
              font-weight: 100 900;
              font-style: normal;
            }`
          )
        );
        document.head.appendChild(fontStyle);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }
}
