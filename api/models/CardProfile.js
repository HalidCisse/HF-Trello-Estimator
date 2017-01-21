/**
 * CardProfile.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    mandays    : {
      type: 'integer',
      defaultsTo : 1
    },

    card : {
      model : 'card'
    },

    profile : {
      model : 'profile'
    }
  }
};

