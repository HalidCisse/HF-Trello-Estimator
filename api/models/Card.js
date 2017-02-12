/**
 * Card.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },

    shortLink: {
      type: 'string'
    },

    isWatched: {
      type: 'boolean',
      defaultsTo : false
    },

    isEstimated: {
      type: 'boolean',
      defaultsTo: false
    },

    board: {
      model: 'board'
    },

    cardProfiles: {
      collection: 'cardProfile',
      via: 'card'
    }
  }

};
