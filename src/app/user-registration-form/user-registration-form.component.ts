import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/** @Component - Angular component decorator to declare a new component */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/** @UserRegistrationFormComponent - class is defined and is set to implement the OnInit interface 
 * @userData - object of the input property, taking Username, Password, Email and Birthday properties
*/
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

/** 
 * @constructor - injects dependencies into the UserLoginFormComponent
 * @param FetchApiData - used to make calls to the API
 * @param dialogRef - used to call the dialog with input from user registration
 * @param snackBar - used for displaying snackbar message that the user has successfully registered
*/
constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

/** this function implements OnInit when the component is initialized */
ngOnInit(): void {
}

/**
 * function responsible for sending the form inputs to the backend
 * If registration is successful, user's data and token is stored in local storage
 * Registration form modal then closes 
 */
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
     this.dialogRef.close(); 
     console.log(result);
     this.snackBar.open(result, 'OK', {
        duration: 4000
     });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 4000
      });
    });
  }

}

