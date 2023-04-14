import { Injectable } from '@angular/core';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private data: any[] = [];
  private pagination: Pagination = { currentPage: 1, totalPages: 0, pageSize: 4 };

  constructor() {

  }

  buildArray(array: any[]) {
    this.data = array;
    this.pagination.totalPages = Math.ceil(this.data.length / this.pagination.pageSize);
  }

  getCurrentPageData(): any[] {
    const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
    const endIndex = startIndex + this.pagination.pageSize;
    return this.data.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.pagination.currentPage < this.pagination.totalPages) {
      this.pagination.currentPage++;
    }
  }

  previousPage(): void {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
    }
  }
}
