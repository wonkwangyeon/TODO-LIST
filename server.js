const express = require('express');
const logger = require('./config/logger')
const bodyParser = require('body-parser')
const sequelize = require('./models/index').sequelize
const morgan = require('morgan')
const cors = require('cors')
const app = express();
sequelize.sync();
app.use(cors({
    origin: 'http://localhost:9000',
    credentials: true
}))

app.use(bodyParser.json())
app.use(morgan('common', { stream: logger.stream }));

var todoRouter = require('./routes/todo');
app.use('/api/todo', todoRouter);


app.listen(3000, function() {
    logger.info('시작')
});