const express = require('express');
const logger = require('./config/logger')
const bodyParser = require('body-parser')
const sequelize = require('./models/index').sequelize
const morgan = require('morgan')
const cors = require('cors')
const app = express();
sequelize.sync();

// Front-End에서의 접근을 위해Cross Origin Resource Sharing 허용 
app.use(cors({
    origin: 'http://localhost:9000',
    credentials: true
}))

app.use(bodyParser.json())
app.use(morgan('common', { stream: logger.stream })); // request시 api정보를 확인하기 위한 morgan 설정

var todoRouter = require('./routes/todo');
app.use('/api/todo', todoRouter);


app.listen(3000, function() {
    logger.info('시작')
});