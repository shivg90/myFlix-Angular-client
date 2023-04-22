import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component for displaying movie details
 */
@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit {
  /**
   * @constructor is used to set dependencies
   * @param data - specific movie data, received from moviecard via MAT_DIALOG_DATA
   * @property {string} Title - movie title
   * @property {string} Description - description of the movie
   * @property {string} Release - year of the movie
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
      Release: string;
    }
  ) {}

  /** this function implements OnInit when the component is initialized */
  ngOnInit(): void {}

}
