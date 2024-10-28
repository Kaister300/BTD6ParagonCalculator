# BTD6ParagonCalculator

[![Deploy static content to GH Pages](https://github.com/Kaister300/BTD6ParagonCalculator/actions/workflows/deploy-gh-pages.yaml/badge.svg)](https://github.com/Kaister300/BTD6ParagonCalculator/actions/workflows/deploy-gh-pages.yaml)

## Overview
A simple web application to caclulate the approximate power of a BTD6 paragon based on in game factors. 
The webpage is situated in the project directory under webpage. An express server, `app.mjs`, has been included to run the page locally.

## Webpage Location
The webpage is being hosted through Github Pages at the following address:

https://kaister300.github.io/BTD6ParagonCalculator/


## Getting Started
Node.js will only be used to run the express server.

```bash
npm install
```

Using the following commands will start the server:

```bash
npm start
```

OR

```bash
node project/app.mjs
```


## Building Site
Building the website requires Python3 and the `python-dotenv` package from pip. The build script can be run using:
```bash
py project/make.py
```
