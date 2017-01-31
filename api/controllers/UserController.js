/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Trello = require('trello');

module.exports = {

  users: function (req, res) {
    User
      .find()
      .exec(function (err, users) {
        if (err) {
          sails.log.error(err);
          return res(500, err);
        }

        res.json(users);
      });
  },

  create: function (req, res) {
    console.log('----------------- UserController create --------------------');
    console.log(req.body.token);
    console.log('------------------------------------------------------------');

    var newUser = {
      token : req.body.token
    };

    if (!newUser.token) {
      return res.json(500, 'No token found');
    }

    var trello = new Trello(sails.config.trello.appKey, newUser.token);

    trello
      .makeRequest('get', '/1/members/me')
      .then(function (member) {
        if (!member) {
          return res.send(404, 'trello user not found');
        }

        newUser.id = member.id;

        User
          .findOrCreate({
            id : newUser.id
          }, newUser)
          .exec(function (err, createdUser) {
            if (err) {
              sails.log.error(err);
              return res.send(500, err);
            }

            createdUser.token = newUser.token;
            createdUser.save(function (err) {
              if (err) {
                sails.log.error(err);
                return res.send(500, err);
              }

              trello
                .getBoards(member.id)
                .then(function (fullBoards) {
                  _.each(fullBoards, function (fullBoard) {
                    TrelloService.watchBoard(fullBoard, trello, function func(next) {
                      // next
                    });
                  });
                  return res.json({id: createdUser.id});
                });
            });
          });
      });
  },

  remove: function (req, res) {
    User
      .destroy({id: id})
      .exec(function (err, user) {
        if (err) {
          sails.log.error(err);
          return res(500, err);
        }

        res.json(user);
      });
  }

};
