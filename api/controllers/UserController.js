/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  users: function (req, res) {
    User.find().exec(function (err, users) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(users);
    });
  },

  create: function (req, res) {

    var newUser = {
      id    : req.param('memberId'),
      token : req.param('token'),
    };

    console.log('--------------- UserController create --------------');
    console.log(req.params.all());
    console.log(newUser);
    console.log('------------------------------------------------------------');


    User.create(newUser).exec(function (err, user) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(user);
    });
  },

  remove: function (req, res) {
    User.destroy({id: id}).exec(function (err, user) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(user);
    });
  }

};

