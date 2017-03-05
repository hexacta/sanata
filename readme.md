# sanata [![Build Status](https://travis-ci.org/hexacta/sanata.svg?branch=master)](https://travis-ci.org/hexacta/sanata) [![code style](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)  
> Web application showing auto generated tweets based on a Markov Chain model of a given Twitter user.

## Development

> Prerequisites: you'll need node and yarn installed

First you install the dependencies:
```
$ yarn install
```

And then run the front-end and back-end with one command:
```
$ npm start
```

In order to use the twitter api you need an [API key and API secret](https://dev.twitter.com/apps).  
Once you have them, create a `.env` file inside the `server` folder, like this:
```
TWITTER_CONSUMER_KEY=yourkey
TWITTER_CONSUMER_SECRET=yoursecret
```

## License

MIT © [Hexacta](http://www.hexacta.com)