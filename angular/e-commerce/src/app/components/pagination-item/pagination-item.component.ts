import { Component, OnInit, Input  } from '@angular/core';
import { PaginationItem } from '../../models/PaginationItem';

@Component({
  selector: 'app-pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrls: ['./pagination-item.component.css']
})
export class PaginationItemComponent implements OnInit {
  @Input() entity: PaginationItem;

  constructor() { }

  ngOnInit() {
  }

}
