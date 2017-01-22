/**
 * ProfileCostController
 *
 * @description :: Server-side logic for managing Profilecosts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {

    var newBoardProfile = {
      mandays   : req.param('mandays'),
      cardId    : req.param('cardId'),
      profileId : req.param('profileId')
    };

    ProfileCost.create(newBoardProfile).exec(function (err, cost) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(cost);
    });
  },

  get: function (req, res) {
    ProfileCost.find().exec(function (err, costs) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(costs);
    });
  },

  remove: function (req, res) {
    ProfileCost.destroy({id: id}).exec(function (err, cost) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(cost);
    });
  }
};

