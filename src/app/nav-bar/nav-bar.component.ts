import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** component dispalying the navigation bar */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  /**
   * @constructor is used to set dependencies
   * @param router is used to navigate user to different views
   */
  constructor(public router: Router) {}
  ngOnInit(): void {}

  /**
   * user is navigated to movies view
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * user is navigated to profile view
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * user is logged out and navigated to welcome screen
   * token and user data is cleared from local storage
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

}
