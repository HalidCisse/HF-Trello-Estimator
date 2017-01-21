/**
 * ProfileCostController
 *
 * @description :: Server-side logic for managing Profilecosts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  costs: function (req, res) {
    ProfileCost.find().exec(function (err, costs) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(costs);
    });
  },

  cost: function (req, res) {
    var id = req.param('id');

    ProfileCost.create({id: id}).exec(function (err, cost) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(cost);
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

