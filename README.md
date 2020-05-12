# LTMS.io
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![forthebadge](https://forthebadge.com/images/badges/built-with-grammas-recipe.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/compatibility-club-penguin.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/does-not-contain-msg.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/validated-html2.svg)](https://forthebadge.com)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/thatnerdjack"><img src="https://avatars2.githubusercontent.com/u/6924261?v=4" width="100px;" alt=""/><br /><sub><b>Jack Doherty</b></sub></a><br /><a href="https://github.com/ltms-io/ltms-io/commits?author=thatnerdjack" title="Code">💻</a> <a href="#ideas-thatnerdjack" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-thatnerdjack" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#projectManagement-thatnerdjack" title="Project Management">📆</a> <a href="https://github.com/ltms-io/ltms-io/pulls?q=is%3Apr+reviewed-by%3Athatnerdjack" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/CrescentRune"><img src="https://avatars0.githubusercontent.com/u/21012272?v=4" width="100px;" alt=""/><br /><sub><b>Hank Krutulis</b></sub></a><br /><a href="#ideas-CrescentRune" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ltms-io/ltms-io/commits?author=CrescentRune" title="Code">💻</a> <a href="https://github.com/ltms-io/ltms-io/pulls?q=is%3Apr+reviewed-by%3ACrescentRune" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

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
