# BTD6ParagonCalculator

[![Deploy static content to GH Pages](https://github.com/Kaister300/BTD6ParagonCalculator/actions/workflows/deploy-gh-pages.yaml/badge.svg)](https://github.com/Kaister300/BTD6ParagonCalculator/actions/workflows/deploy-gh-pages.yaml)

## Overview
A simple web application to caclulate the approximate power of a BTD6 paragon based on in game factors.
This uses bun at the development runtime along with the React front-end framework to render and run the main calculation logic. 

## Webpage Location
The webpage is being hosted through Github Pages at the following address:

https://kaister300.github.io/BTD6ParagonCalculator/


## Getting Started
This project uses the Bun runtime. In order to install bun please follow the guide [here](https://bun.sh/)

After installing bun, use the following command below to set up the `node_modules` folder:

```bash
bun install
```

Use the following command to run the application in development mode:

```bash
bun run dev
```


## Building Site
Building the site requires running the Vite build script which can be seen below:

```bash
bun run build
```

This will create the static web files at the `./dist` location which are needed for the web page upload.