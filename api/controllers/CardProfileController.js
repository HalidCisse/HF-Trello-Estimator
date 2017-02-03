/**
 * CardProfileController
 *
 * @description :: Server-side logic for managing Cardprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  profiles: function (req, res) {
    var cardShortlink = req.param('shortLink');

    Card
      .findOne({ shortLink: cardShortlink })
      .exec(function (err, card) {
        if (err) {
          sails.log.error(err);
          res.send(500, 'Card not found.');
        }
        
        CardProfile
          .find({ card: card.id })
          .exec(function (err, profiles) {
            if (err) {
              sails.log.error(err);
              res.send(500, 'Can\'t find this card\'s profiles.');
            }

            res.send(profiles);
          });
      })
  }

};
