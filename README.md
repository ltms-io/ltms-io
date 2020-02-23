# LTMS.io

[![forthebadge](https://forthebadge.com/images/badges/built-with-grammas-recipe.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/compatibility-club-penguin.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/does-not-contain-msg.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/validated-html2.svg)](https://forthebadge.com)

## General Notes

- The current plan is to develop the frontend and backend in their own folders as opposed to serving the frontend out of the express server from the build directory. This is so that we can take advantage of hot-reload developing.
- Testing has been setup in the backend. It requires you to go into the testing-app.js file and declare your routes and any other dependencies that are in app.js. Open to better approaches. 

## Lanuages and Frameworks

- Backend: Node.js + Express + mongoose
- Frontend: Node.js + React
- Databse: MongoDB

## Running List of Installed (or need to be installed) NPM Packages

- React Router
- React Bootstrap
- React Redux
    - React Redux Dev Tools

## Dev Environment Setup (INCOMPLETE, ask Jack)

### Frontend

1. Ensure you have NPM installed

    - On MacOS this can be accomplished with Homebrew.
    - Other OS please read NPM's documentation.

2. Type the following to setup frontend/

``` {bash}
cd frontend/
npm install
```

3. To run React app run `npm start`

### Backend

1. Ensure you have NPM installed (see Frontend steps).
2. Type the following to setup backend/

``` {bash}
cd backend/
npm install
```

3. To run express server, run `DEBUG=backend:* npm start`
