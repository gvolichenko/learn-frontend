const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
var cors = require('cors')
var bodyParser = require('body-parser')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require("node-fetch");

const app = express()

app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(__dirname)


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})



textInput = {};
// POST route to get the text input
app.post('/posttext', inputText);

function inputText (req,res){
    
    textInput = req.body;
    res.send('done');
};


// GET route to call the API and return the result to the client
app.get('/test', function (req, res) {
    
    const url='https://api.meaningcloud.com/sentiment-2.1';
    fetch(`${url}?key=${process.env.API_KEY}&lang=en&txt=${textInput.input}`)
    .then(res => res.json())
    .then(function(data) {
        res.send(data)
    })
})




