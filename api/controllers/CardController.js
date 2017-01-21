/**
 * CardController
 *
 * @description :: Server-side logic for managing Stories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  cards: function (req, res) {
    Card.find().exec(function (err, cards) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(cards);
    });
  },

  card: function (req, res) {
    var id = req.param('id');

    Card.create({id: id}).exec(function (err, card) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(card);
    });
  },

  remove: function (req, res) {
    Card.destroy({id: id}).exec(function (err, card) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(card);
    });
  },



  manday: function (req, res) {

    var cardId    = req.param('cardId');
    var profileId = req.param('profileId');
    var manday    = req.param('manday');

    Card.findOne({id : cardId}).exec(function (err, cards) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(cards);
    });
  },

  profile: function (req, res) {
    Card.find().exec(function (err, cards) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(cards);
    });
  },
};

