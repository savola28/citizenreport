var mongoose = require("mongoose");
var config = require('./config/database.js');

module.exports = function (callback)
{
    mongoose.connect(config.uri, config.options, function (err)
    {
        if (err) throw err;
        
        console.log('Mongoose connected');
        
        callback(mongoose);
    });
};