import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentDate = Date.now();
  searchValue = "";

  constructor(private router: Router) { }

  searchClick(value: string) {
    this.router.navigate(['/products', 1, value]);
  }
}
