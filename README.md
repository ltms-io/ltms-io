# LTMS.io

[![forthebadge](https://forthebadge.com/images/badges/built-with-grammas-recipe.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/compatibility-club-penguin.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/does-not-contain-msg.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/validated-html2.svg)](https://forthebadge.com)

## General Notes

- The repository is setup to auto deploy to Heroku on every push to master. Branching should be done off of dev, which will be merged as needed.
- Testing has been setup in the backend. It requires you to go into the testing-app.js file and declare your routes and any other dependencies that are in app.js. Open to better approaches. 

## Lanuages and Frameworks

- Backend: Node.js + Express + mongoose
- Frontend: Node.js + React
- Database: MongoDB

## Dev Environment Setup

### Frontend

1. Ensure you have NPM installed

    - On MacOS this can be accomplished with Homebrew.
    - Other OS please read NPM's documentation.

2. Type the following to setup frontend/

``` {bash}
cd frontend/ltms-io/
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
