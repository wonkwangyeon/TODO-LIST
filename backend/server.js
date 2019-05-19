const express = require('express');
const logger = require('./config/logger')
const bodyParser = require('body-parser')
const sequelize = require('./models/index').sequelize
const morgan = require('morgan')
const cors = require('cors')
const app = express();
sequelize.sync();
const PORT = process.env.PORT
let corsURI = "http://localhost:9000"
if (process.env.NODE_ENV === "production") {
    corsURI = ["http://2019-programmers-todo.wky.kr", "https://2019-programmers-todo.wky.kr" ]
}
// Front-End에서의 접근을 위해Cross Origin Resource Sharing 허용
app.use(cors({
    origin: corsURI,
    credentials: true
}))

app.use(bodyParser.json())
app.use(morgan('common', { stream: logger.stream })); // request시 api정보를 확인하기 위한 morgan 설정

let todoRouter = require('./routes/todo');
app.use('/api/todo', todoRouter);


app.listen(PORT, function() {
    logger.info('시작')
});
