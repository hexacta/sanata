# sanata [![Build Status](https://travis-ci.org/hexacta/sanata.svg?branch=master)](https://travis-ci.org/hexacta/sanata) [![code style](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)  
> Web application showing auto generated tweets based on a Markov Chain model of a given Twitter user.

## Development

> Prerequisites: you'll need node and npm installed

If you don't have `yarn` installed, install it:
```
$ npm i -g yarn
```

After cloning the repo, install the dependencies. Inside sanata folder, run:
```
$ yarn install
```

And then run the front-end and back-end with one command:
```
$ yarn start
```

By default this run the front-end at http://localhost:3000/ and the back-end at http://localhost:8080/. Both are watching for changes, so there is no need to re-start it after changes.  


In order to use the twitter api you need an [API key and API secret](https://dev.twitter.com/apps).  
Once you have them, create a `.env` file inside the `server` folder, like this:
```
TWITTER_CONSUMER_KEY=yourkey
TWITTER_CONSUMER_SECRET=yoursecret
#MONGO_URL=mongodb://localhost:27017/sanata
```

### Database

If you don't specify a `MONGO_URL` in your .env file, Sanata will run with a mocked db. This means that every request will go to the Twitter API without using any cached information from the user.  
So, for most cases you don't need a DB, but if you insist, you have two options: run mongodb with docker or use your own instance.  

If you have docker installed, running this command should be enough:
```
yarn run start:mongo
```
>Don't forget to add (or uncomment) `MONGO_URL=mongodb://localhost:27017/sanata` in your .env file.

## Contributing
This project follows the "fork-and-pull" git workflow:

1. Fork the repo on GitHub
1. Clone the project to your own machine
1. Commit changes to your own branch
1. Push your work back up to your fork
1. Submit a Pull request so that we can review your changes

Here is a good [step-by-step guide](http://stackoverflow.com/a/20956155/1325646).

## Related Posts
- [Decoupling front end and back end](https://engineering.hexacta.com/decoupling-front-end-and-back-end-530d55b998a5)
- [Automatic deployment of multiple Docker containers to Google Container Engine using Travis](https://engineering.hexacta.com/automatic-deployment-of-multiple-docker-containers-to-google-container-engine-using-travis-e5d9e191d5ad)
- [Triggering deploys with git tags](https://engineering.hexacta.com/triggering-deploys-with-git-tags-21993147352f)

## License

MIT © [Hexacta](http://www.hexacta.com)