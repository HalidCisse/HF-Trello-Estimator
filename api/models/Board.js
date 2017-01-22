/**
 * Board.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name           : { type: 'string' },

    totalMonths    : {
      type: 'integer',
      defaultsTo : 8
    },

    isWatched    : {
      type: 'boolean',
      defaultsTo : false
    },

    downPayPercent : {
      type: 'float',
      defaultsTo : 14
    },



    cards: {
      collection: 'card',
      via: 'board'
    },

    boardProfiles: {
      collection: 'boardProfile',
      via: 'board'
    },

    user: {
      model: 'user'
    }
  }
};

