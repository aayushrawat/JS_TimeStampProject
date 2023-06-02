// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//  API Route if /api/:time is null
app.get("/api", (req, res) => {
  const unixnow = Date.now()
  const response = {
    unix: unixnow,
    utc: new Date(parseInt(unixnow)).toUTCString()
  };
  res.json(response);
});

// Normal API Route
app.get('/api/:giventime', (req, res) => {
const { giventime } = req.params;
const isUnix = /^\d+$/.test(giventime);
const isDate = /^\d{4}-\d{2}-\d{2}$/.test(giventime);
// const isnotnull = !isNaN(parseInt(giventime));

if (isUnix)  {
  // Convert the Unix timestamp to UTC
  const utcTime = new Date(parseInt(giventime)).toUTCString();
  // Create the JSON response object
  const response = {
    unix: parseInt(giventime),
    utc: utcTime
  };
  // Send the JSON response
  // res.send(isUnix);
  res.json(response);
  
} else if (isDate) {

  const unixtime = Date.parse(giventime);
  const utcTime = new Date(parseInt(unixtime)).toUTCString();
  const response = {
    unix: unixtime,
    utc: utcTime
  };
  res.json(response);

} else {
  res.json({ error: "Invalid Date" });
};

});




// listen for requests :)
// const port = process.env.PORT;
const port = 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});