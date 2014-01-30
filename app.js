var express = require('express');
var database = require("./database.js");
var restAPI = require("./restAPI.js");

var app = express();

app.use(express.static('./public'));
app.use(express.json());

database(function (mongoose)
{
    restAPI(app, mongoose, function ()
    {
        app.listen(process.env.PORT);
    });
});