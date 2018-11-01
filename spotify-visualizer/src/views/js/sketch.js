/**
 * @name P5Sketch
 * @returns a sketch script that <code>P5Wrapper.js</code> will run
 * 
 */

export default function sketch(p) {

    /**
     * @name fetchData
     * @param {string} accessToken Takes an <code>accessToken</code> as a parameter
     * @returns {id} User's Currently Playing data from the Spotify API
     * This function is using an asychronous operation
     * a <code>promise</code> is made -> it can either be resolved or rejected
     * If error (reject) then you <code>catch</code> the error and return it
     * If the code within the try/catch is successful, then you return the id of the song currently playing
     * 
     * NOTE: all of my async functions are now not in use since P5 doesn't particularly like being called in async time from an external source
     */
    function fetchData(accessToken) {
        return new Promise(async (resolve, reject) => {
            try {
                let results = await
                fetch('https://api.spotify.com/v1/me/player', {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(response => response.json()).then(data => {
                    let id = data.item.id
                    return id;
                })
                return resolve(results);
            } catch (e) {
                return reject(e);
            }
        })
    }

    /**
     * @function
     * @name getURLParams
     * @param {string} request 
     * @returns {string} returns payload 
     * This function is a manually created querystring function
     * takes the uri of the window, creates a URL object out of it
     * Then takes the url and searches it for the request (i.e. an accesstokoen) and returns the request payload
     * 
     * NOTE: all of my async functions are now not in use since P5 doesn't particularly like being called in async time from an external source
     */
    function getURLParams(req) {
        var uri = window.location.href;
        var url = new URL(uri);
        var res = url.searchParams.get(req);
        return res
    }

    /**
     * @function
     * @name getAudioFeatures
     * @param {string} id - The ID of the currently playing song
     * @param {string} access_token - The user access token generated from the OAuth Methond
     * @returns {JSON}  returns a json object with the audio features of the currently playing song
     *
     * <code>getAudioFeatures</code> is also an async function returning a promise
     * In this case, it takes the id and access token and returns the appropriate song audio analysis for the specific id requested
     * 
     * NOTE: all of my async functions are now not in use since P5 doesn't particularly like being called in async time from an external source
     */
    function getAudioFeatures(id, access_token) {
        return new Promise(async (resolve, reject) => {
            try {
                let fetchURL = 'https://api.spotify.com/v1/audio-features/' + id;
                console.log(fetchURL);
                let results = await
                fetch(fetchURL, {
                    headers: {
                        "Authorization": "Bearer " + access_token
                    }
                }).then(response => response.json()).then(data => {
                    let audioAnalysis = [];
                    audioAnalysis.push({
                        "BPM": data.tempo,
                        "danceability": data.danceability
                    })
                    return audioAnalysis;
                })
                return resolve(results)
            } catch (e) {
                return reject(e);
            }
        })
    }

    /**
     * @function
     * @name doEverything
     * @returns {async_runtime} 
     * 
     * The async function <code>doEverything</code> just runs all of my previous functions but in async time
     * Running said functions using an <code>await</code> parameter before calling the function ensures that the function is fully executed
     * and resolved with a returned value before inserting it into a variable 
     * 
     * This avoids what is aptly described as "async callback hell" where undefined values (which are returned because the function is still resolving)
     * destroy runtime speeds and RAM utilization
     * 
     * NOTE: all of my async functions are now not in use since P5 doesn't particularly like being called in async time from an external source
     */
    async function doEverything() {
        const access_token = await getURLParams("access_token");
        const id = await fetchData(access_token);
        const audioAnalysis = await getAudioFeatures(id, access_token);
    }



    //need to limit rates so i don't make 60 api calls per second and get thrown a 429 error
    let rate = 0;

    //just initialize the array of values i will be using to visualize the BPM of a song
    let test = []

    //global var for the diameter of the ellipse which will be constantly changing
    var diameter;

    /**
     * @function
     * @name p.setup - Setup function within a regular P5 sketch
     * 
     * notice that I use the syntax <code>p.setup = function ()</code> to declare my setup function
     * This is because i need to explicitly declare that setup is a child function of my component property <code>p</code>
     * The P5 wrapper scripts will run setup accordingly
     */
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
        p.colorMode(p.HSB, 360, 100, 100);
        p.noStroke();
        p.ellipseMode(p.RADIUS);
        p.frameRate(600);
    }


    /**
     * @function 
     * @name p.draw
     * 
     * draw function iterates at 60FPS for smoother rendering
     * as I said before, it is declared as <code>p.draw</code> so the P5Wrapper component can find the function
     */
    p.draw = function () {

        // rate gets + 1 per frame, the modulo 120 ensures that the api call will only be made every 2 seconds, avoiding 429 response errors
        if ((rate % 120) === 0) {
            p.getSongID()
        }

        //clears background, making sketch transparent
        p.clear();
        //r is just a var that converts BPM to a time based construct
        var r = p.millis() / (1000 / (test[0] / 60.0));
        r -= p.int(r);
        diameter = p.map(r, 0, 2.5, 400, 0); //map the bpm to diameter, and then change diameter each frame to increase/decrease based on beat

        // *slightly* slow down the seizure-inducing radial gradient effects using a loop
        for (var i = 0; i < 7; i++) {

            //if test[2] is true, then render the beat visualizing circle => test 2 is equivalent to the boolean is_playing state of the spotify API
            if(test[2] === true) {
            p.drawGradient(p.windowWidth / 2, p.windowHeight / 2)
            }
        }
        rate++;
    }

    /**
     * @function
     * @name p.drawGradient
     * @param {int} x - x coordinate of ellipse(s)
     * @param {int} y - y coordinate of ellipse(s)
     * @returns {draw()} returns a drawn ellipse on canvas
     * 
     * calculates radius of circle based on diameter. 
     * Diameter is a global value mapped to the BPM values of the current song
     * Diameter constantly changes per frame based on what time within the beat it is
     */
    p.drawGradient = function (x, y) {
        var radius = diameter / 2;
        var randColor = p.random(0, 360);

        //for loop, draws circles until there's no more radii left to do so
        for (var r = radius; r > 0; --r) {
            p.fill(200, randColor, 120); //blue
            p.ellipse(x, y, r, r);
            randColor = (randColor + 1) % 69; //tried random numbers until it looked good
        }
    }

    /**
     * @function
     * @name p.getAccessToken
     * @returns {string} - the payload of the request
     * 
     * same as the earlier get access token function, only this time makes it a p5 function just for consistency
     */
    p.getAccessToken = function () {
        var uri = window.location.href;
        var url = new URL(uri);
        var res = url.searchParams.get("access_token");
        return res
    }

    /**
     * @function
     * @name p.getSongID
     * @returns {JSON} returns JSON file that includes the current player state of the user
     * 
     * <code>p.loadJSON(url, callback)</code> first <code>GETs</code> the JSON file from the path specific with specified headers
     * then executes the callback function, automatically passing in the JSON file to the callback function as a parameter
     */
    p.getSongID = function () {
        var res = p.getAccessToken()
        return p.loadJSON("https://api.spotify.com/v1/me/player?access_token=" + res, p.getAudioFeatures);

    }

    /**
     * @function
     * @name p.getAudioFeatures 
     * @param {JSON} data - takes data passed in from the <code>p.getSongID</code> function
     * @returns {JSON} returns a JSON file of the audio analysis of the current song playing
     * 
     * 
     */
    p.getAudioFeatures = function (data) {
        var res = p.getAccessToken()
        console.log(data)
        var id = data.item.id
        var isPlaying = data.is_playing
        test[2] = isPlaying
        var audioFeatures = p.loadJSON("https://api.spotify.com/v1/audio-features/" + id + '?access_token=' + res, p.resolveAnalysis)
        console.log(audioFeatures)
    }

    p.resolveAnalysis = function(data) {
        var tempo = data.tempo;
        var danceability = data.danceability;
        test[0] = tempo
        test[1] = danceability
    }
}