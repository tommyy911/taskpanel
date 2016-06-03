var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    UserSchema = new mongoose.Schema({
        name: {type: String, unique: false, required: true},
        username: {type: String, unique: true, required: true},
        job: {type: String, unique: false, required: false},
        note: {type: String, unique: false, required: false},
        password: {type: String, required: true}
    });


UserSchema.pre('save', function (callback) {
    var user = this;

    if (!user.isModified('password')) {
        return callback();
    }
    bcrypt.genSalt(5, function (err, salt) {
        if (err) {
            return callback(err)
        }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return callback(err)
            }
            user.password = hash;
            callback();
        })

    })
});


module.exports = mongoose.model('User', UserSchema);