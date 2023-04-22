import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * dialog component for displaying director details
 */
@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})

export class DirectorViewComponent implements OnInit {
  /**
   * @constructor is used to set dependencies
   * @param data - specific director info, received from moviecard via MAT_DIALOG_DATA
   * @property {string} Name - name of director
   * @property {string} Bio - short biography of director
   * @property {string} Birthday - year of birth
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birthday: string;
    }
  ) {}

  /** this function implements OnInit when the component is initialized */
  ngOnInit(): void {}

}
