const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);
const BadRequestError = require('../error/BadRequestError')

// title -String 형식 최대 50자 이하
const setTodo = {
    title: Joi.string().max(50)
}

// id - Integer, created_time - Date, priority Integer, title - String 최대 50자 이하
// complete - Integer 0 or 1 , content - String, expire - Date(YYYY-MM-DD)
const modifyTodo = {
    id: Joi.number().integer(),
    created_time: Joi.date(),
    priority: Joi.number().integer(),
    title: Joi.string().max(50),
    complete: Joi.number().integer().min(0).max(1),
    expire: Joi.date().format('YYYY-MM-DD'),
    content: Joi.string()
}

// id - Integer
const deleteTodo = {
    id: Joi.number().integer()
}
module.exports = {

    /**
     * TODO 생성전 title 범위 확인하는 함수
     * @param {title} obj TODO 제목을 받는다.
     * @return {JSON} 
     * 성공시 error null반환
     * 에러일 경우 true 반환
     */
    verifySetTodo: function(req, res) {
        return Joi.validate(req.body, setTodo);
    },
    /**
     * TODO 수정전 id, title, content, complete, created_time, expire, priority 범위 확인하는 함수
     * @param {id, title, content, complete, created_time, expire, priority} obj
     * 수정에 필요한 키값인 id와 수정할 내용 title, content, complete, created_time,expire, priority를 받는다.
     * @return {JSON} 
     * 성공시 error null반환
     * 에러일 경우 true 반환
     */
    verifyModifyTodo: function(req, res) {

        let result = Joi.validate({ title: req.body.title }, setTodo);
        if (result.error !== null) {

            throw new BadRequestError('작업은 50자 이하로 입력해주세요')
        } else {
            if (req.body.expire === null || req.body.expire === '')
                return Joi.validate({
                    id: req.body.id,
                    created_time: req.body.created_time,
                    priority: req.body.priority,
                    title: req.body.title,
                    complete: req.body.complete,
                    content: req.body.content
                }, modifyTodo);
            else {
                return Joi.validate(req.body, modifyTodo);
            }
        }
    },
    /**
     * 수정하기 전 Joi.verifyDeleteTodo 통해 스키마범위를 확인한다.
     * @param {id} obj 삭제에 필요한 키값인 id를 받는다.
     * @return {JSON}
     * 성공시 error null반환
     * 에러일 경우 true 반환
     */
    verifyDeleteTodo: function(req, res) {
        return Joi.validate(req.query, deleteTodo);
    }
}