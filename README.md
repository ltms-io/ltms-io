# LTMS.io
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d2e93e34bea44c19bc7079bb012649a6)](https://app.codacy.com/gh/ltms-io/ltms-io?utm_source=github.com&utm_medium=referral&utm_content=ltms-io/ltms-io&utm_campaign=Badge_Grade_Settings)
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
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
    <td align="center"><a href="https://github.com/singh497"><img src="https://avatars3.githubusercontent.com/u/47434320?v=4" width="100px;" alt=""/><br /><sub><b>singh497</b></sub></a><br /><a href="https://github.com/ltms-io/ltms-io/commits?author=singh497" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/schmi150"><img src="https://avatars3.githubusercontent.com/u/45135268?v=4" width="100px;" alt=""/><br /><sub><b>Joseph Schmidt</b></sub></a><br /><a href="https://github.com/ltms-io/ltms-io/commits?author=schmi150" title="Code">💻</a> <a href="https://github.com/ltms-io/ltms-io/pulls?q=is%3Apr+reviewed-by%3Aschmi150" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://neelch.com"><img src="https://avatars2.githubusercontent.com/u/11469222?v=4" width="100px;" alt=""/><br /><sub><b>Neel Chaudhari</b></sub></a><br /><a href="https://github.com/ltms-io/ltms-io/commits?author=neelc17" title="Code">💻</a> <a href="#design-neelc17" title="Design">🎨</a> <a href="https://github.com/ltms-io/ltms-io/pulls?q=is%3Apr+reviewed-by%3Aneelc17" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/CrescentRune"><img src="https://avatars0.githubusercontent.com/u/21012272?v=4" width="100px;" alt=""/><br /><sub><b>Hank Krutulis</b></sub></a><br /><a href="#ideas-CrescentRune" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ltms-io/ltms-io/commits?author=CrescentRune" title="Code">💻</a> <a href="https://github.com/ltms-io/ltms-io/pulls?q=is%3Apr+reviewed-by%3ACrescentRune" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Want to help out? Join our Slack [here](https://join.slack.com/t/ltmsio/shared_invite/zt-ef96hd01-hPKQGh7CuruRoPskPljkEg)! 

## General Notes

- The repository is setup to auto deploy to Heroku on every push to master. Branching should be done off of dev, which will be merged as needed. 

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
