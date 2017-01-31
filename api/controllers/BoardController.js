/**
 * BoardController
 *
 * @description :: Server-side logic for managing Boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  boards: function (req, res) {
    Board
      .find()
      .exec(function (err, boards) {
        if (err) {
          sails.log.error(err);
          return res(500, err);
        }

        res.json(boards);
      });
  },

  board: function (req, res) {
    var id = req.param('id');

    Board
      .create({id: id})
      .exec(function (err, board) {
        if (err) {
          sails.log.error(err);
          return res(500, err);
        }

        res.json(board);
      });
  },

  remove: function (req, res) {
    Board
      .destroy({id: id})
      .exec(function (err, board) {
        if (err) {
          sails.log.error(err);
          return res(500, err);
        }

        res.json(board);
      });
  },

  downPay: function (req, res) {
    var boardId = req.param('boardId');
  },

  totalCost: function (req, res) {
    var boardId = req.param('boardId');
  },

  totalDuration: function (req, res) {
    var boardId = req.param('boardId');
  },

  monthlyCost: function (req, res) {
    var boardId = req.param('boardId');
  },

  stats: function (req, res) {
    var boardId = req.param('boardId');

    //downPay
    //totalCost
    //totalDuration
    //monthlyCost
  }

};
