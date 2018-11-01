# P5.js Spotify Visualizer


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This Spotify Visualizer was created using the create-react-app npm package as a barebones framework and an Oauth Bridge Template
  - Visualize the BPM of your currently playing Spotify Song
  - See error messages thrown right onto your very own screen (!!!)
  - Fueled by espresso and 2am coding sessions.
  - ***Disclaimer:*** Documentation may harm your mental health

## New Features!

  - It works
  - Auth token expires after one hour (definitely a feature)


## How to Use
  - Make sure a song is playing on your spotify account
  - Log in with spotify
  - Success! Now you can watch a slightly dizzying circle bounce around


## Known Errors

Didn't have enough time to fully try/catch everything so uh there's quite a few of them

* Random exceptions -> just close the error screen when it pops up (sometimes Spotify throws a 502 error on their side)
* Undefined values -> probably just means you either aren't playing a song or the access token has expired. Try playing a song first, or going to the [root URL](https://spotify.davidli3100.com) and logging in again
* Song not in sync with visualizer -> sometimes the API is slow, pause/play your song and wait 2 seconds for my server to catch up then it should be fine


### File Structure

A brief outline of the important files that are in this repo

| Path | Description |
| ------ | ------ |
| spotify-visualizer/src/Home.js | React component that renders the one pager, also includes API calls |
| spotify-visualizer/src/P5Wrapper.js | React component that takes a P5 sketch as input and renders it (better cross-platform in-browser performance) |
| spotify-visualizer/src/js/sketch.js | Where my P5 sketch and some API calls reisde |
| spotify-visualizer-backend/server.js | Basic OAuth Bridge to instantiate Spotify Auth flows and pass tokens to my frontend server |



### Development

Want to run this on your local machine?

Clone this github repo and install the LTS version of Node.js
You will also need to sign in as a [Spotify Developer](https://developer.spotify.com) and create an app 

In the app, you will need your CLIENT_ID and CLIENT_SECRET, make sure to set your callback URLs to ```localhost:yourPort/callback```

In each folder, create a ```.env``` file to store your environment variables. 

In the spotify-visualizer folder, you will need the following variables

| Variable | Description |
| ------ | ------ |
| PORT | The port you want the frontend server to run off of (defaults to 3000) |
| CLIENT_ID | The Spotify Client ID (obtained from your developer dashboard) |
|SECRET| Spotify Client Secret |
|AUTH_URL| Authentication URL the "Login with Spotify" button redirects to |

In the spotify-visualizer-backend folder, add these variables to the ```.env``` file you created

| Variable | Description |
| ------ | ------ |
| PORT | The port you want the frontend server to run off of (defaults to 80) |
| CLIENT_ID | The Spotify Client ID (obtained from your developer dashboard) |
|CLIENT_SECRET| Spotify Client Secret |
|REDIRECT_URI| The URI spotify will run a callback redirect on with the access codes|
|FRONTEND_URI| The URI where the front end server is running (defaults to localhost:3000)

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ cd spotify-visualizer
$ npm install
$ npm start

```


Second Tab:
```sh
$ cd spotify-visualizer-backend
$ npm install
$ npm start
```
At this point, React-scripts would have opened a browser tab with the app in it. Verify that logging in and getting callbacks works. Then you're free to modify this!



### Todos

 - Write MORE Tests
 - try/catch for server response errors 
 - pop up modal instructing users to play music if music is not currently playing
 - fully implement refresh tokens so access tokens can automatically refresh after the 60 minute limit





