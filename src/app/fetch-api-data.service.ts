import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://movieapi-9rx2.onrender.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

 /**
  * Makes the API call to register a new user
  * @param userDetails - Username, Password, Email and Birthday are sent in the request body of the API call
  * @returns - A JSON object holding data about the specific user
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails)
    .pipe(catchError(this.handleError)
    );
  }

  /**
   * Makes the API call to login a user
   * @param userDetails - Username and Password are sent in the request body of the API call
   * @returns A JSON object holding data about the specific user
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
    .pipe(catchError(this.handleError));
  }

  /**
   * Makes the API call to get all movies
   * @returns - an array of the full movie database as a JSON 
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes the API call to get a movie by it's title
   * @param title - the title of the movie to be fetched
   * @returns - a JSON object holding data about the single movie
   */
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes the API call to get a director by name
   * @param directorName - the name of the director to be fetched
   * @returns - a JSON object holding data about the specific director
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes the API call to get a genre by name
   * @param genreName - the name of the genre to be fetched
   * @returns - a JSON object holding data about the specific genre
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes the API call to get a user by name
   * @returns - a JSON object holding data about the specific user
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes the API call to get a user's favorite movies
   * @returns - an array with id of all favorite movies in JSON format
   */
  getFavMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * Makes the API call to add a movie to the user's favorite movies list
   * @param movieId - the ID of the movie to be added
   * @returns - a JSON object holding data about the specific user
   */
  addFavMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
      .post(apiUrl + 'users/' + userName + 'movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * Makes the API call to update an existing user's information
   * @param updatedUser - the updated user information (Username, Password, Email, Birthday)
   * @returns - a JSON object holding data about the specific user
   */
  editUser(updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
      .patch(apiUrl + 'users/' + userName, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes the API call to delete a user's account
   * @returns - an alert message that the user's account was deleted
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes the API call to delete a movie from the user's favorote movies list
   * @param movieId - the ID of the movie to be deleted
   * @returns - a JSON object holding data about the specific user
   */
  deleteFavMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/' + userName + 'movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * Extracts the non-typed response data from the API calls
   * @param res - response from the API call
   * @returns - the response body or an empty JSON object if response body is null or undefined
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  /**
   * Handler for HTTP error responses
   * @param error  - the HTTP error response object
   * @returns - error message "Something bad happened; please try again later"
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
