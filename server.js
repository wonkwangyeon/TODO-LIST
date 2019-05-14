var express = require('express');
var logger = require('./config/logger')
var bodyParser = require('body-parser')
var sequelize = require('./models/index').sequelize
var morgan = require('morgan')
var app = express();
sequelize.sync();

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(morgan('common', { stream: logger.stream }));

var todoRouter = require('./routes/todo');
app.use('/api/todo', todoRouter);


app.listen(3000, function() {
    logger.info('시작')
});