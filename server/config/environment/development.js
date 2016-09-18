'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    /*uri: 'mongodb://localhost/tunariDB-dev'*/
    uri:'mongodb://admin:test1234@ds161495.mlab.com:61495/tunari'
  },
  loggingOptions: {
  	logDir: './log'
  }
};