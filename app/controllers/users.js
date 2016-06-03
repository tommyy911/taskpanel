var User = require('../models/User');


exports.postUser = function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.name = req.body.name;
    user.job = req.body.job;
    user.note = req.body.note;

    user.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({msg: 'User added to DB', data: user});
    })
};

exports.getUsers = function (req, res) {
    User.find(function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    })
};

exports.getUser = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.send(err)
        }
        res.json(user);
    })
};

exports.putUser = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {

        if (err) {
            res.send(err)
        }

        user.name = req.body.name;
        user.job = req.body.job;
        user.note = req.body.note;

        user.save(function (err) {
            if (err) {
                res.send(err)
            }

            res.json(user)
        })
    })

};

exports.deleteUser = function (req,res) {
  User.findByIdAndRemove(req.params.user_id,function(err){
      if(err){
          res.send(err);
      }
      res.json({msg:'User has been removed'});
  })
};

