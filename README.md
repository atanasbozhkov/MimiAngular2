<img width="150" src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" />
<img width="50" src="https://angular.io/assets/images/logos/angular/angular.svg" />

## Stack

- Angular 4 ( 4.x )
- ExpressJS ( 4.x - with compression )
- Webpack ( angular-cli )

## Concepts

- Redux ( NgRx/Store - with server calls)
- Smart & dumb components
- AOT: Ahead-of-Time compilation
- Advanced routing ( lazy loading, router outlets...)

## Install / Development

```bash
git clone https://github.com/atanasbozhkov/MimiAngular2
cd MimiAngular2

# Install dependencies
yarn install

# start server
yarn run start

# Client url: http://localhost:4200
# Application ( epxress ) API: http://localhost:4300
```

Install Redux DevTools chrome extenstion:

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

## Build / Production

```bash

yarn run build

## Deploy dist folder to app server

Structure of dist folder:

/dist/server <-- expressjs
/dist/client <-- angular4

```
