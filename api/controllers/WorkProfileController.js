/**
 * WorkProfileController
 *
 * @description :: Server-side logic for managing Workprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  profiles: function (req, res) {
    WorkProfile.find().exec(function (err, profiles) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(profiles);
    });
  },

  profile: function (req, res) {
    var id = req.param('id');

    WorkProfile.create({id: id}).exec(function (err, profile) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(profile);
    });
  },

  remove: function (req, res) {
    WorkProfile.destroy({id: id}).exec(function (err, profile) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(profile);
    });
  }


};

