# MySlack

![myslack](https://raw.githubusercontent.com/SarahZimmermann-Schmutzler/MySlack/main/img_github/myslack.png)

**MySlack** is a **business chat client** - a platform similar to [slack](https://slack.com/intl/de-de), but specifically for business use.  
  
The project was created as part of my training at the Developer Akademie. This is the **final project of the Frontend course**.

## Table of Contents

1. [Technologies](#technologies)  
1. [Description](#description)
   * [Frontend (Angular)](#frontend-angular)
   * [Backend (AngularFire/Firebase)](#backend-angularfirefirebase)
1. [Quickstart](#quickstart)  
1. [Usage](#usage)

## Technologies

* **Angular CLI** 15.2.0, [More Information](https://github.com/angular/angular-cli)
* **HTML / SCSS / TypeScript**
* **AngularFire** 7.5.0, [More Information](https://github.com/angular/angularfire)
  * Offers an Angular-specific integration of [Firebase](https://firebase.google.com/)

## Description

### Frontend (Angular)

This frontend project is based on a **template provided by the Developer Akademie** and offers a fully functional **chat application powered by Firebase**.

* **User Accounts & Authentication**
  * **Sign up** with name, email and password
    ![signup](https://raw.githubusercontent.com/SarahZimmermann-Schmutzler/MySlack/main/img_github/signup.png)
  * **Login** via user account or guest access
    ![login](https://raw.githubusercontent.com/SarahZimmermann-Schmutzler/MySlack/main/img_github/login.png)
  * **Password reset** via email
    ![password](https://raw.githubusercontent.com/SarahZimmermann-Schmutzler/MySlack/main/img_github/password.png)

* **Channel System**
  * **Public channels** for group chatting
    * Users can **create and edit** channels (name & description)
  * Post **messages** and reply in **threads**
  * **Thread section** is open by default, but can be toggled
    ![channels](https://raw.githubusercontent.com/SarahZimmermann-Schmutzler/MySlack/main/img_github/channels.png)

* **Direct Messaging (DMs)**
  * Send **private messages** to other registered users
    ![dm](https://raw.githubusercontent.com/SarahZimmermann-Schmutzler/MySlack/main/img_github/dm.png)
  * Send messages to yourself (e.g., for **personal notes**)
    ![note](https://raw.githubusercontent.com/SarahZimmermann-Schmutzler/MySlack/main/img_github/notes.png)

* **Additional Features**
  * Built-in **dummy profiles** provide example content
  * **Search** for members
  * The profile saves the **status** so you can see which users are currently active

## Backend (AngularFire/Firebase)

This project does not use a custom backend.  
Instead, it relies on [**Firebase**](https://firebase.google.com/) as a **Backend-as-a-Service (BaaS)**, integrated via [AngularFire](https://github.com/angular/angularfire), the official Angular library for Firebase.  
  
**Firebase handles**:

* **Authentication**
  * Email/password **login**
  * **Password reset** via email
* **Firestore database** - Real-time storage and retrieval of:
  * **Users** (mail, name, picture, status)
    * Direct messages between users
    * Notes (self-messages)
  * **Channels** (description, name)
    * Messages within each channel
    * Threaded replies to messages
* **Firebase Hosting**
  * **Static deployment** of the Angular app

This setup allows for a fully serverless and scalable chat application with minimal backend maintenance.

## Quickstart

This section provides a **minimal setup guide**. For detailed instructions, see [Usage](#usage) section.

1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the project to your platform:
    * <ins>Example</ins>: Clone the repo e.g. using an SSH-Key:  

    ```bash
    git clone git@github.com:SarahZimmermann-Schmutzler/MySlack.git
    ```

1. **Install the Dependencies**:

    ```bash
    npm install
    ```

1. Create a **Firebase Project** [here](https://console.firebase.google.com)

1. **Change Firebase Configuration** in `environment.ts` and `environment.development.ts`:

    ```bash
    export const environment = {
        firebase: {
            projectId: 'your-project-id',
            appId: 'your-app-id',
            storageBucket: 'your-project.appspot.com',
            apiKey: 'YOUR_API_KEY',
            authDomain: 'myour-project.firebaseapp.com',
            messagingSenderId: 'your-messaging-sender-id',
        }
    };
    ```

> [!IMPORTANT]
> **Do not use the configuration provided in this repository. Always use your own Firebase credentials!**

5. **Run the App**:

    ```bash
    ng serve
    ```

## Usage

1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the project to your platform:
    * <ins>Example</ins>: Clone the repo e.g. using an SSH-Key:  

    ```bash
    git clone git@github.com:SarahZimmermann-Schmutzler/MySlack.git
    ```

    * Change in the project directory:

    ```bash
    cd MySlack
    ```

1. **Install the Dependencies**:

    ```bash
    npm install
    ```

1. Create a **Firebase Project** [here](https://console.firebase.google.com):

   * Go to **Firebase Console**
   * Click `Add project`
   * Complete the setup wizard
   * Under `Project Settings > General`, create a **Web App**
   * Your will need the **config object** for the next step

1. **Change Firebase Configuration** in `environment.ts` and `environment.development.ts`:

   * To **connect your local project to your own Firebase instance**, follow these steps:
     * Copy the Firebase configuration and replace the values in:

       ```bash
       src/environments/environment.ts  
       src/environments/environment.development.ts
       ```

    <ins>Example:</ins>

    ```bash
    export const environment = {
        firebase: {
            projectId: 'your-project-id',
            appId: 'your-app-id',
            storageBucket: 'your-project.appspot.com',
            apiKey: 'YOUR_API_KEY',
            authDomain: 'myour-project.firebaseapp.com',
            messagingSenderId: 'your-messaging-sender-id',
        }
    };
    ```

> [!IMPORTANT]
> **Do not use the configuration provided in this repository. Always use your own Firebase credentials!**

5. **Run the App**:

    ```bash
    ng serve
    ```

    * Navigate in your **browser** to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
