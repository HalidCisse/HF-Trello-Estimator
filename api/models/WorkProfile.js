/**
 * WorkProfile.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name       : { type: 'string' },

    mandays    : {
      type: 'integer',
      defaultsTo : 1
    },





    profileCosts : {
      collection : 'profileCost',
      via: 'workProfile'
    },

    stories : {
      collection : 'story',
      via: 'workProfiles'
    }
  }
};

