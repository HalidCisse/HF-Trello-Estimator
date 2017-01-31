/**
 * BoardProfile.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    mandayCost: {
      type: 'float',
      defaultsTo: 0
    },

    board: {
      model: 'board'
    },

    profile: {
      model: 'profile'
    }
  }

};
