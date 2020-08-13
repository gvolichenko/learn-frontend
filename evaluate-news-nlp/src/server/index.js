const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
var cors = require('cors')
var bodyParser = require('body-parser')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

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

console.log(`Your API key is ${process.env.API_KEY}`);



// GET route
app.get('/test', function (req, res) {
    console.log(req.body);
    //let json = {'message': req}
    //res.send(json)
})




