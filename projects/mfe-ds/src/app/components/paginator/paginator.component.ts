import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input({ required: true }) currentPage: number = 1;
  @Input({ required: true }) totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxDisplayedPages = 5;

    if (this.totalPages <= maxDisplayedPages) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    if (this.currentPage > 3) pages.push('...');

    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (this.currentPage < this.totalPages - 2) pages.push('...');
    if (this.currentPage < this.totalPages - 1) pages.push(this.totalPages);

    return pages;
  }

  changePage(page: number | string): void {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
