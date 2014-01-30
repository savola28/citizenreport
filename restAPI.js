var fs = require("fs");
var modelDir = './models/';

var handleResponse = function (res, promise)
{
    promise.then(function (result){
        res.json(result);
    }, function (err){
         throw err;
    });
};

var initModel = function (app, mongoose, modelFile)
{
    var modelConf = require(modelDir + modelFile);
    
    var modelSchema = new mongoose.Schema(modelConf.schema);

    var Model = mongoose.model(modelConf.modelName, modelSchema);

    var restName = '/rest/'+modelConf.path;
    var restNameWithId = restName + '/:id';
    
    // find
    app.get(restName, function(req, res) {
        var promise = Model.find(req.query).exec();
        handleResponse(res, promise);
    });

    // find by id
    app.get(restNameWithId, function(req, res) {
        var promise = Model.findById(req.params.id).exec();
        handleResponse(res, promise);
    });

    // create new
    app.post(restName, function(req, res) {
        var promise = Model.create(req.body);
        handleResponse(res, promise);
    });
    
    // update
    app.put(restNameWithId, function(req, res) {
        var promise = Model.findByIdAndUpdate(req.params.id, req.body).exec();
        handleResponse(res, promise);
    });
    
    // remove
    app.delete(restNameWithId, function(req, res) {
        var promise = Model.findByIdAndRemove(req.params.id).exec();
        handleResponse(res, promise);
    });
    
    console.log('Model ' + modelConf.modelName + ' was initialized.');
};

module.exports = function (app, mongoose, callback)
{
    var modelFiles = fs.readdirSync(modelDir);
    
    for (var i = 0; i < modelFiles.length; i++) {
        initModel(app, mongoose, modelFiles[i]);
    }
    
    callback();
};
