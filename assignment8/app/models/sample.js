const mongoose = require('mongoose');

module.exports = mongoose.model('schema', {
    email : {type:  String, default: ''},
    password : {type: String, default: ''},
    versionKey: false
})