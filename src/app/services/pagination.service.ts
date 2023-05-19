import { Injectable } from '@angular/core';


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
  private intervalId?: any = 0;
  constructor() {

  }

  buildArray(props: PaginationProps) {
    
    this.items = props.items;
    this.pageSize = props.pageSize;
    this.currentPage = 1;
    this.intervalId = setInterval(() => {
      if (this.currentPage < this.totalPages()) {
        this.nextPage();
      } else {
        this.currentPage = 1;
      }
    }, 15000);
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
    } else {
      this.currentPage = 1;
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
    } else {
      this.currentPage = this.totalPages();
    }
  }

}
