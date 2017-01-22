/**
 * Created by Halid on 1/21/17.
 */

var http = require('http');
var concat = require('concat-stream');



module.exports = {


  watchBoard: function(boardId, boardName, trello, next) {

    Board.findOrCreate({id : boardId}, {id: boardId, name : boardName, isWatched : false}).exec(function (err, createdBoard) {
      if (err) {
        sails.log.error(err);
        return next(500, err);
      }

      if(createdBoard.isWatched == false){
        // tod weekhook
        //createdBoard.isWatched = false;
      }

      createdBoard.name = boardName;
      createdBoard.save(
        function(err){
          if (err) {
            sails.log.error(err);
            //return next(500, err);
          }

          TrelloService.watchBoardCards(createdBoard.id, trello, function func(next) {});
          next(createdBoard);
        });
    });
  },

  watchBoardCards: function(boardId, trello, next) {

    trello.getCardsOnBoard(boardId)
      .then((allCards) => {
        for (i = 0; i < allCards.length; i++) {
          var card = allCards[i];

          if(!card.shortLink){
            card.shortLink = card.id;
          }

          Card.findOrCreate({id : card.shortLink}, {id: card.shortLink, name : card.name, isWatched : false}).exec(function (err, createdCard) {
            if (err) {
              sails.log.error(err);
              return next(500, err);
            }

            if(createdCard.isWatched == false){
              // tod weekhook
              //createdCard.isWatched = false;
            }

            createdCard.name = card.name;
            createdCard.save(
              function(err){
                if (err) {
                  sails.log.error(err);
                  //return next(500, err);
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