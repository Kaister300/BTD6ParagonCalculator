# BTD6ParagonCalculator
## Overview
A simple web application to caclulate the approximate power of a BTD6 paragon based on in game factors. 
The webpage is situated in the project directory under webpage. An express server, `app.mjs`, has been included to run the page locally.

## Webpage Location
The webpage is being hosted through Cloudflare at the following address:

https://btd6paragoncalculator.pages.dev/


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

Building the website requires Python3 and the `python-dotenv` package from pip. The build script can be run using:
```bash
python3 project/make.py
```
