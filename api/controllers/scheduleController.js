'use-strict';

exports.createSchedule = function(req, res) {
    res.json(require('./builderController').buildSchedule(
        req.body
    ));
}