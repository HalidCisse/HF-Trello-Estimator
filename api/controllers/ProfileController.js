/**
 * WorkProfileController
 *
 * @description :: Server-side logic for managing Workprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {
    var profileName = req.param('name');
    var boardShortLink = req.param('boardShortLink');
    var mandayCost = req.param('mandayCost');

    if(!profileName) {
      return res.send(500, 'profileName cant be empty');
    }

    if(!boardShortLink) {
      return res.send(500, 'boardShortLink cant be empty');
    }

    if(!mandayCost) {
      return res.send(500, 'mandayCost cant be empty');
    }

    Profile
      .findOrCreate({name : profileName}, {name : profileName})
      .exec(function (err, profile) {
        if (err) {
          sails.log.error(err);
          return res.send(500, err);
        }

        Board
          .findOne({shortLink : boardShortLink})
          .exec(function (err, board) {
            if (err) {
              sails.log.error(err);
              return res(500, err);
            }

            var newBoardProfile = {
              mandayCost : mandayCost,
              board      : board.id,
              profile    : profile.id
            };

            BoardProfile.findOrCreate({board : board.id, profile : profile.id}, newBoardProfile).exec(function (err, boardProfile) {
              if (err) {
                sails.log.error(err);
                return res.send(500, err);
              }

              boardProfile.mandayCost = mandayCost;
              boardProfile.save(function (err) {
                res.json(boardProfile);
              });
            });
          });
      });
  },

  profiles: function (req, res) {
    var shortLink = req.param('shortLink');
    console.log('ShortLink', shortLink);

    Board
      .findOne({ shortLink: shortLink })
      .populate('boardProfiles')
      .then(function (board) {
        var boardProfiles = BoardProfile
          .find({ board: board.id })
          .then(function (boardProfiles) {
            return boardProfiles;
          });
        return [board, boardProfiles];
      })
      .spread(function (board, boardProfiles) {
        var profiles = [];

        async.each(boardProfiles, function (bProfile, cb) {
          Profile
            .findOne({ id: bProfile.profile })
            .then(function (profile) {
              profiles.push({
                id        : profile.id,
                mandayCost: bProfile.mandayCost,
                name      : profile.name
              });
              cb(null);
            })
            .catch(function (err) {
              cb(err);
            });
        }, function (err) {
          if (err) {
            console.log('Error in Profile.profiles :', err);
            throw err;
          }
          res.json(profiles);
        });
      }).catch(function (err) {
        if (err) return res.serverError(err);
      });
  },

  profile: function (req, res) {
    var profileId = req.param('profileId');
    var boardId   = req.param('boardId');

    BoardProfile.findOne({board: boardId, profile: profileId}).exec(function (err, profile) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(
        {
          board      : profile.id,
          profile    : profile.id,
          mandayCost : profile.mandayCost,
          id         : profile.id
        });
    });
  },

  remove: function (req, res) {
    var profileId = req.param('profileId');

    BoardProfile.destroy({id: profileId}).exec(function (err, profile) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(profile);
    });
  }

};
