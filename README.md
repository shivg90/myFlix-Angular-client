# MyFlixAngularClient

## Objective

To build the client-side of an application called MyFlix based on existing server-side code (REST API and database), with supporting documentation.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.5.

## Demo

The deployed app can be viewed here: https://shivg90.github.io/myFlix-Angular-client/

## Description

### Key Features

- App displays a welcome view where users will be able to either log in or register for an account.
- Once authenticated, the user should be able to view the main page of all movies and a navbar.
- Each movie card container allows the viewing of the following information:
  - A button that opens a dialog,​ where details about the director of that particular movie will be displayed.
  - A button that opens a dialog,​ where details about the genre of that particular movie will be displayed.
  - A button that opens a dialog,​ where details about the synopsis of that particular movie will be displayed.
  - A button that allows users to add or remove a movie to their list of favorites.
- The navbar provides routes to a profile view and logout button.
- Profile view lets users edit their info, delete account and view their list of favorite movies.

### User stories

- As a user, I want to be able to receive information on movies, directors, and genres so that I
  can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
