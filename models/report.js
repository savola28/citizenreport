module.exports = {
    
    path: 'reports',
    
    modelName: 'Report',
    
    schema: {
        date: {type: Date, index: true},
        comment: {type: String}
    }
};