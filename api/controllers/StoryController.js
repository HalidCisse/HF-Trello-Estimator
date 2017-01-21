/**
 * StoryController
 *
 * @description :: Server-side logic for managing Stories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  stories: function (req, res) {
    Story.find().exec(function (err, stories) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(stories);
    });
  },

  story: function (req, res) {
    var id = req.param('id');

    Story.create({id: id}).exec(function (err, story) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(story);
    });
  },

  remove: function (req, res) {
    Story.destroy({id: id}).exec(function (err, story) {
      if (err) {
        sails.log.error(err);
        return res(500, err);
      }

      res.json(story);
    });
  }
	
};
