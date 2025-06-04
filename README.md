# MySlack

**MySlack** is a **business chat client** - a platform similar to [slack](https://slack.com/intl/de-de), but specifically for business use.  
  
This is the **final project for the frontend course** at the Developer Akademie.

## Table of Contents

1. [Technologies](#technologies)  
1. [Description](#description)
   * [Frontend (Angular)](#frontend-angular)
1. [Quickstart](#quickstart)  
1. [Usage](#usage)

## Technologies

* **Angular CLI** 15.2.0, [More Information](https://github.com/angular/angular-cli)
* **HTML / SCSS / TypeScript**
* **AngularFire** 7.5.0, [More Information](https://github.com/angular/angularfire)
  * offers an Angular-specific integration of [Firebase](https://firebase.google.com/)

## Description

### Frontend (Angular)

This frontend project is based on a template provided by the Developer Akademie and offers a fully functional chat application powered by Firebase.

* **User Accounts & Authentication**
  * **Sign up** with name, email and password
    * Profile saves the **status** so you can see which users are currently active
      ![signup](https://raw.githubusercontent.com/SarahZimmermann-Schmutzler/MySlack/main/img_github/signup.png)
  * **Login** via user account or guest access
  * **Password reset** via email

* **Channel System**
  * **Public channels** for group chatting
    * Users can **create and edit** channels (name & description)
  * Post **messages** and reply in **threads**
  * **Thread section** is open by default, but can be toggled

* **Direct Messaging (DMs)**
  * Send **private messages** to other registered users
  * Send messages to yourself (e.g., for **personal notes**)

* **Additional Features**
  * Built-in **dummy profiles** provide example content
  * **Search** for members

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
