/**
 * Creating a home page, that should be fully static (pending state changes to the callback and login uris)
 * Just using another view page to implement within a router in App.js
 */
import React, { Component } from 'react';
import './css/Home.css';

export default class Home extends Component {
    state = {

    }

    render() {
        return (
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
    crossorigin="anonymous">

  <!-- montserrat font (too lazy to bundle this using webpack) -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">

  <title>
    <%= title %>
  </title>
  <link rel='stylesheet' href='/css/style.css' />
</head>

<body>
<div class="main">
  <div class="contain col-sm-12">
  <div class="title col-sm-12">
    <h1 id="start-title">
      <%= title %>
    </h1>
    <h4>
      <%= sub_title %>
    </h4>
  </div>

  <div class="get_started col-sm-12">
    <a class="start_btn btn-sm btn-success" href="<%= auth_link %>">Connect To Spotify</a>
  </div>
  </div>
</div>

  <!-- Web CDNs for JS libraries -->

  <!-- Import library for spotify-connect auth -->
  <script src="https://spotify-player.herokuapp.com/spotify-player.js"></script>

  <!-- jquery -->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
    crossorigin="anonymous"></script>

</body>
        )
    }
}