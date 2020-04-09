import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {

  @Input() page: number;

  @Output()
  newPage: EventEmitter<number> = new EventEmitter<number>();

  nextPage() {
    this.page++;
    this.newPage.emit(this.page);
  }

  lastPage() {
    if (this.page > 1) this.page--;
    this.newPage.emit(this.page);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

