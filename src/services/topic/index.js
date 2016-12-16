'use strict';

const service = require('feathers-mongoose');
const topic = require('./topic-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: topic,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/topics', service(options));

  // Get our initialize service to that we can bind hooks
  const topicService = app.service('/topics');

  // Set up our before hooks
  topicService.before(hooks.before);

  // Set up our after hooks
  topicService.after(hooks.after);
};