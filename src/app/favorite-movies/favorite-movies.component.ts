import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { DetailsViewComponent } from '../details-view/details-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * defines user favorite movies component
 */
@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent {
  /**
   * below variables will manage the data received from the API calls 
   * @favoriteMovies stores the specfic user's favorite movies
   * @user stores the specific user's data
   */
  favoriteMovies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
    console.log(this.favoriteMovies)
  }

  /**
   * Fetches user's favorite movies by filterng API call fetchApiData.getAllMovies() by user and movie id
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((user: any) => {
      this.user = user;
      this.fetchApiData.getAllMovies().subscribe((movies: any) => {
        this.favoriteMovies = movies.filter((m: any) => user.FavoriteMovies.includes(m._id))
      });
    });
  }

  /**
   * Determines if a movie id is in the user's favorites list or not
   * @param id of movie, type: string
   * @returns boolean showing movie id is true or false
  */
  isFavorite(id: string): boolean {
    return this.user.FavoriteMovies.includes(id);
  }
  
  /**
   * Adds movie to user's favorite movies list using the API call fetchApiData.addFavMovie()
   * @function addToFavorites
   * @param id of movie, type: string
  */
  addToFavorites(id: string): void {
    this.fetchApiData.addFavMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
  
  /**
    * Removes movie from user's favorite movies list using the API call fetchApiData.deleteFavMovie()
    * @function removeFromFavorites
    * @param id of movie, type: string
  */
  removeFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Opens dialog to display genre details
   * @param name of specfic Genre
   * @param description of specific Genre
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  /**
   * Opens dialog to display director details
   * @param name of director
   * @param bio of director
   * @param birthday of director
   */
  openDirector(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
      },
      width: '400px',
    });
  }

   /**
   * Opens dialog to display movie details
   * @param title of movie
   * @param description of movie
   */
  openDetails(title: string, description: string): void {
    this.dialog.open(DetailsViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '400px',
    });
  }
}
