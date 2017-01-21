/**
 * Created by Halid on 1/21/17.
 */

var Trello = require("trello");

module.exports = {


  watchBoard: function(userId, userToken, next) {

    var trello = new Trello(sails.config.trello.appKey, userToken);

    // Get all registered tokens and webhooks
    // Url will look like: https://api.trello.com/1/members/me/tokens?webhooks=true&key=YOURKEY&token=YOURTOKEN
    trello.makeRequest('get', '/1/members/me/tokens', { webhooks: true })
      .then((res) => {
        console.log(res)
      });

    trello.get("/1/members/me", function(err, data) {
      if (err) throw err;
      console.log(data);
    });

    trello.get("/1/members/me", { cards: "open" }, function(err, data) {
      if (err) throw err;
      console.log(data);
    });

    Board.find().exec(function(err, boards) {
      if(err){
        sails.log.error(err);
        return next(500, err);
      }

      next(boards);
    });
  },

  watchCard: function(cardId, next) {

    var trello = new Trello(sails.config.trello.appKey, userToken);

    // Get all registered tokens and webhooks
    // Url will look like: https://api.trello.com/1/members/me/tokens?webhooks=true&key=YOURKEY&token=YOURTOKEN
    trello.makeRequest('get', '/1/members/me/tokens', { webhooks: true })
      .then((res) => {
        console.log(res)
      });

    trello.get("/1/members/me", function(err, data) {
      if (err) throw err;
      console.log(data);
    });

    trello.get("/1/members/me", { cards: "open" }, function(err, data) {
      if (err) throw err;
      console.log(data);
    });

    Board.find().exec(function(err, boards) {
      if(err){
        sails.log.error(err);
        return next(500, err);
      }

      next(boards);
    });
  },

  boards: function(userId, userToken, next) {

    var trello = new Trello(sails.config.trello.appKey, userToken);

    // Get all registered tokens and webhooks
    // Url will look like: https://api.trello.com/1/members/me/tokens?webhooks=true&key=YOURKEY&token=YOURTOKEN
    trello.makeRequest('get', '/1/members/me/tokens', { webhooks: true })
      .then((res) => {
           console.log(res)
       });

    trello.get("/1/members/me", function(err, data) {
      if (err) throw err;
      console.log(data);
    });

    trello.get("/1/members/me", { cards: "open" }, function(err, data) {
      if (err) throw err;
      console.log(data);
    });

    Board.find().exec(function(err, boards) {
      if(err){
        sails.log.error(err);
        return next(500, err);
      }

      next(boards);
    });
  },





};