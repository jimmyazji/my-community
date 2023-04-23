import { Injectable } from '@angular/core';
import { Pagination } from '../models/pagination';


interface PaginationProps {
  items: any[];
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})


export class PaginationService {

  items!: any[];
  pageSize!: number;
  currentPage!: number;

  constructor() {

  }

  buildArray(props: PaginationProps) {
    this.items = props.items;
    this.pageSize = props.pageSize;
    this.currentPage = 1;
  }
  totalPages(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }

  currentItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return this.items.slice(startIndex, endIndex);
  }

  hasNextPage(): boolean {
    return this.currentPage < this.totalPages();
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
    }
  }

}
