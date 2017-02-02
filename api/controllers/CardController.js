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

  setManday: function (req, res) {

    var cardId     = req.param('cardId');
    var profileId  = req.param('profileId');
    var mandays    = req.param('mandays');

    if(!cardId){
      return res.send(500, 'cardId cant be empty');
    }
    if(!profileId){
      return res.send(500, 'profileId cant be empty');
    }
    if(!mandays){
      return res.send(500, 'mandays cant be empty');
    }

    CardProfile.findOrCreate({card : cardId, profile : profileId},
      {
        card      : cardId,
        profile   : profileId,
        mandays   : mandays
      })
      .exec(function (err, createdProfile) {
        if (err) {
          sails.log.error(err);
          return res.send(500, err);
        }

        createdProfile.mandays   = mandays;
        createdProfile.save(
          function(err){
            if (err) {
              sails.log.error(err);
            }
            res.send(createdProfile);
          });
      });
  },

  addProfile: function (req, res) {
    var cardShortLink    = req.param('cardShortLink');
    var profileId        = req.param('profileId');
    var mandays          = req.param('mandays');

    if(!cardShortLink){
      return res.send(500, 'cardShortLink cant be empty');
    }

    if(!profileId){
      return res.send(500, 'profileId cant be empty');
    }

    Card.findOne({shortLink : cardShortLink}).exec(function (err, card) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }
      if(!card){
        return res.send(500, 'card not found');
      }

      CardProfile.findOrCreate(
        {card : card.id, profile : profileId},
        {
          card      : card.id,
          profile   : profileId,
          mandays   : mandays
        })
        .exec(function (err, createdProfile) {
          if (err) {
            sails.log.error(err);
            return res.send(500, err);
          }

          createdProfile.mandays   = mandays;
          createdProfile.save(
            function(err){
              if (err) {
                sails.log.error(err);
              }
              res.send(createdProfile);
            });
        });
    });
  },

  profiles: function (req, res) {
    var cardShortLink = req.param('cardShortLink');

    Card
      .findOne({shortLink : cardShortLink})
      .populate('cardProfiles')
      .then(function (card){
        var cardProfiles = CardProfile.find({
          card: card.id
        }).then(function (cardProfiles){
          return cardProfiles;
        });
        return [card, cardProfiles];
      })
      .spread(function (card, cardProfiles){

        var all = [];
        var count = cardProfiles.length;
        if(count == 0){
          res.json([]);
        }

        for (i = 0; i < cardProfiles.length; i++) {
          var element = cardProfiles[i];
          Profile.findOne({id: element.profile})
            .then(function (profile){
              all.push(
                {
                  id        : profile.id,
                  mandayCost: element.mandayCost,
                  name      : profile.name
                });

              count = count -1;
              if(count <= 0){
                res.json(all);
              }
            })
            .catch(function (err){
              count = count -1;
            });
        }
      }).catch(function (err){
      if (err) return res.serverError(err);
    });
  },
};

