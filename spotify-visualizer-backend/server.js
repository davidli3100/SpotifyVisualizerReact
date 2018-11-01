let express = require('express')
let request = require('request')
let querystring = require('querystring')
require('dotenv').config();

let app = express()

//full disclosure this was made using an engine - basically just produced the snippets for code and you fill in the rest of the requests yourself
// also followed along with spotify's examples for this 

// redirect uri for the callback on auth
let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback'

console.log(redirect_uri);

//path the frontend server redirects users to, for auth

/**
 * @name login
 * @returns {access_token} returns an access token after user logs in
 * when an user GETS the login path, we redirect them to authorize and then take an access token for later use
 */
app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-playback-state',
      redirect_uri
    }))
})

console.log(process.env.SPOTIFY_CLIENT_ID);

/**
 * redirect the callback with the access token to the front-end server (built in react)
 * when the spotify auth protocol redirects the user to my callback uri after authentication on their end,
 * this app fetches the access code to then later convert to an access token (seen in the request.post part)
 */
app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    var refresh_token = body.refresh_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token + "&refresh_token=" + refresh_token)
  })
})

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)