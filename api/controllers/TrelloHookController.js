/**
 * TrelloHookController Controller
 *
 * @description :: Server-side logic for managing Trellohookcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request  = require('request');

module.exports = {

  /**
   * `TrelloHookController`
   */
  callback: function (req, res) {

    console.log('--------------- TrelloHookController callback --------------');
    // console.log(req.params.all().type);
    // console.log(req.params.all().data);
    // console.log(req.body.action);
    console.log('------------------------------------------------------------');


    // What type of actions do we want to respond to?
    // In this case, updateCard or createCard
    if(req.body.action.type === 'updateCard' ||
      req.body.action.type === 'createCard' &&
      req.body.action.data.card.name) {

      // Get the name and id of the card
      var oldName = req.body.action.data.card.name;
      var id      = req.body.action.data.card.id;

      // Let's only update if it's not already marked priority
      if(oldName.indexOf("PRIORITY:") === -1) {
        newName = "PRIORITY:" + oldName;

        // Construct and send the Trello PUT with the new name
        var path = 'https://api.trello.com/1/cards/' + id + '/name?key=' + key + '&token=' + token;
        request(
          {
            method: 'PUT',
            uri: path,
            body: {value: newName},
            json: true
          },
          function (error, response, body) {
            if(response.statusCode == 200){
              console.log("successfully updated card");
            } else {
              console.log('error: '+ response.statusCode);
              console.log(body);
            }
          });
      }
    }
    res.send('OK');
  }



};

