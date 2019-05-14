var express = require('express');
var logger = require('./config/logger')
var sequelize = require('./models/index').sequelize
var app = express();
sequelize.sync();

var todoRouter = require('./routes/todo');
app.use('/api/todo', todoRouter);

app.listen(3000, function () {
    logger.info('s')
  console.log('Example app listening on port 3000!');
});