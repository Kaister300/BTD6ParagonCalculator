# BTD6ParagonCalculator

[![Deploy on push](https://github.com/Kaister300/BTD6ParagonCalculator/actions/workflows/on-push.yaml/badge.svg)](https://github.com/Kaister300/BTD6ParagonCalculator/actions/workflows/on-push.yaml)

## Overview
A simple web application to caclulate the approximate power of a BTD6 paragon based on in game factors. 
The webpage is situated in the project directory under webpage. An express server, `app.mjs`, has been included to run the page locally.

## Webpage Location
The webpage is being hosted through Cloudflare at the following address:

https://btd6paragoncalculator.pages.dev/


## Getting Started - Node
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

## Getting Started - Python
Use the `requirements.txt` in the `project` folder to download the necessary dependencies. 

```bash
pip install -r project/requirements.txt
```

This project can also host a local server using the Flask package. Using the following command will start the server:

```bash
python3 project/server.py
```

## Building Site
Building the website requires Python3 and the `python-dotenv` package from pip. The build script can be run using:
```bash
py project/make.py
```
