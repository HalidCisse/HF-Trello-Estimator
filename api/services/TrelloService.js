/**
 * Created by Halid on 1/21/17.
 */

var http   = require('http');
var concat = require('concat-stream');


module.exports = {

  watchBoard: function(board, trello, next) {

    Board.findOrCreate({id : board.id}, {shortLink: board.shortLink, id: board.id, name : board.name, isWatched : false})
      .populate('boardProfiles')
      .exec(function (err, createdBoard) {
      if (err) {
        sails.log.error(err);
        return next(500, err);
      }

      if(createdBoard.isWatched == false){
        // tod weekhook
        //createdBoard.isWatched = false;
      }

      createdBoard.name = board.name;
      createdBoard.save(
        function(err){
          if (err) {
            sails.log.error(err);
            //return next(500, err);
          }

          TrelloService.watchBoardCards(createdBoard, trello, function func(next) {});
          next(createdBoard);
        });
    });
  },

  watchBoardCards: function(board, trello, next) {

    trello.getCardsOnBoard(board.id)
      .then((allCards) => {
        for (i = 0; i < allCards.length; i++) {
          var card         = allCards[i];
          var cardProfiles = [];

          board.boardProfiles.forEach(function(element) {
            cardProfiles.push({card : card.id, profile : element.profile, mandays : 0})
          });

          Card.findOrCreate({id : card.id},
            {
              id           : card.id,
              shortLink    : card.shortLink,
              name         : card.name,
              isWatched    : false,
              cardProfiles : cardProfiles
            }).exec(function (err, createdCard) {
            if (err) {
              sails.log.error(err);
              return next(500, err);
            }

            if(createdCard.isWatched == false){
              // todo register weekhook
              //createdCard.isWatched = false;
            }

            createdCard.name = card.name;
            createdCard.save(
              function(err){
                if (err) {
                  sails.log.error(err);
                }
                next(createdCard);
              });
          });
        }
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
  }

};