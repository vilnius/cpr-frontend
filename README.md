<p align="center">
  <img src="https://raw.githubusercontent.com/vilnius/cpr-frontend/master/src/assets/img/c4v-logo.jpeg">
</p>

# Car Plate Reader - Frontend

[![Build Status](https://api.travis-ci.org/vilnius/cpr-frontend.svg?branch=master)](https://travis-ci.org/vilnius/cpr-frontend)

> **This repository is just for frontend code!** Backend code is located at
[cpr-server](https://github.com/vilnius/cpr-server).
Make sure you configure `cpr-server` to serve files from `cpr-frontend`'s `dist` folder.
<br>
> This code is written in [TypeScript](http://www.typescriptlang.org/) and is based
on [Angular Starter Kit](https://github.com/AngularClass/angular-starter)
from [AngularClass](https://angularclass.com). Please read their great readme file for
all additional information.
<br>
> Style is based on Bootstrap [Paper theme](https://bootswatch.com/paper/)

## Quick start

```bash
# clone git repo
git clone https://github.com/vilnius/cpr-frontend.git

# change directory to repo
cd cpr-frontend

# install dependencies with npm
npm install

# watch and produce output in dist folder
npm run watch
```

Launch `cpr-server` with `npm start` and navigate to home page at [http://localhost:3000](http://localhost:3000).
Default credentials to login: `admin/admin`

## Scripts

### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
# all files can be found in folder 'dist'
```

### run tests
```bash
npm run test
```

### watch and run tests
```bash
npm run watch:test
```

### run end-to-end tests
```bash
npm run e2e
```

# License
 [MIT](/LICENSE)
