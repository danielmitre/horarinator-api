'use strict';

module.exports = function(app) {
    let schedule = require('../controllers/scheduleController');
    
    app.route('/schedule/create').post(schedule.createSchedule);        
};