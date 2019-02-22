const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

let routes = require('./api/routes/scheduleRoutes');

routes(app);

app.listen(port);

console.log(`Horarinator API started on: ${port}.`)