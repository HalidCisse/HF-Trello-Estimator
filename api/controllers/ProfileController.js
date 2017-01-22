/**
 * WorkProfileController
 *
 * @description :: Server-side logic for managing Workprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {

    var profileName = req.param('name');
    var boardId     = req.param('boardId');
    var mandayCost  = req.param('mandayCost');

    if(!profileName){
      return res.send(500, 'profileName cant be empty');
    }

    if(!boardId){
      return res.send(500, 'boardId cant be empty');
    }

    if(!mandayCost){
      return res.send(500, 'mandayCost cant be empty');
    }

    Profile.findOrCreate({name : profileName}, {name : profileName}).exec(function (err, profile) {
      if (err) {
        sails.log.error(err);
        return res.send(500, err);
      }

      var newBoardProfile = {
        mandayCost : mandayCost,
        board      : boardId,
        profile    : profile.id
      };

      BoardProfile.findOrCreate({board : boardId, profile : profile.id}, newBoardProfile).exec(function (err, boardProfile) {
        if (err) {
          sails.log.error(err);
          return res.send(500, err);
        }

        boardProfile.mandayCost = mandayCost;
        boardProfile.save(
          function(err){
            res.json(boardProfile);
          });
      });
    });
  },

  profiles: function (req, res) {
    var boardId     = req.param('boardId');

    BoardProfile.find({board : boardId})
      .populate('profile')
      .exec(function (err, profiles) {
        if (err) {
          sails.log.error(err);
          return res(500, err);
        }

        var all = [];
        profiles.forEach(function(element) {
          all.push(
            {
              id   : element.profile.id,
              name : element.profile.name
            });
        });
        res.json(all);
      });
  },

  profile: function (req, res) {
    var profileId      = req.param('profileId');
    var boardId = req.param('boardId');

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

