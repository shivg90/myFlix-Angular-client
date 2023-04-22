import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'; // used to navigate between pages
import { FetchApiDataService } from '../fetch-api-data.service';

// closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// displays notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/** @Component - Angular component decorator to declare a new component */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

/** @UserLoginFormComponent - class is defined and is set to implement the OnInit interface 
 * @userData - object of the input property, taking Username and Password properties
*/
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  /** 
   * @constructor - injects dependencies into the UserLoginFormComponent
   * @param FetchApiDataService - used to make calls to the API
   * @param dialogRef - used to call the dialog with input from user login
   * @param snackBar - used for displaying snackbar message that the user has successfully logged in
   * @param router - used to navigate to the welcome screen after user is logged in
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}


  /** this function implements OnInit when the component is initialized */
  ngOnInit(): void {}

  /**
   * Function responsible for sending the form inputs to the backend
   * If login is successful, user's data and token is stored in local storage
   * Login form modal then closes and user is taken to the list of all movies via the navigation router
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); 
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']); 
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
