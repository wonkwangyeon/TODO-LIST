const express = require('express');
const router = express.Router();
const Joi = require('../lib/schemaVerify')
const todoService = require('../service/todoService')
const BadRequestError = require('../constants/error/BadRequestError')
const InvalidRequestError = require('../constants/error/InvalidRequestError')
    // TODO 조회하는 API
    /**
     * DB에 저장되어있는 TODO를 조회하는 API
     * @return {JSON} 성공시 목록과함께 200코드 반환, 실패시 500코드와 에러메세지 반환.
     */
router.get('/', async function(req, res) {
    try {
        let list = await todoService.getList()
        return res.status(200).json(list)
    } catch (e) {
        return res.status(500).json(e)
    }
});

/**
 * TODO 생성하는 API
 * 생성전 Joi.verifySetTodo로 먼저 스키마 범위를 확인한다.
 * @param {title} obj TODO 제목을 받는다.
 * @return {JSON} 성공시 200코드 반환,
 * title이 50자 초과일경우 400코드와 에러메세지 반환
 * 그 외 에러일 경우 500코드와 에러메세지 반환
 */
router.post('/', async function(req, res) {
    try {

        let result = Joi.verifySetTodo(req)
        if (result.error !== null) {
            throw new BadRequestError('작업은 50자 이하로 입력해주세요')
        }
        let list = await todoService.setList(req)
        let msg = {
            message: "작성하였습니다",
        }
        return res.status(200).json(msg)
    } catch (e) {
        return res.status(e.code).json(e)
    }

});


/**
 * TODO 수정하는 API, 제목,내용,만료일 수정 부터 
 * TODO 완료처리 및 우선순위까지 이 API에서 처리함
 * 수정하기 전 Joi.verifyModifyTodo를 통해 스키마범위를 확인한다.
 * @param {id, title, content, complete, created_time, expire, priority} obj
 * 수정에 필요한 키값인 id와 수정할 내용 title, content, complete, created_time,expire, priority를 받는다.
 * @return {JSON} 성공시 200코드 반환,
 * title이 50자 초과일경우 400코드와 에러메세지 반환
 * 그 외 에러일 경우 500코드와 에러메세지 반환
 */
router.put('/', async function(req, res) {

    try {
        if (!Array.isArray(req.body)) {
            let result = Joi.verifyModifyTodo(req)
            if (result.error !== null) {
                throw new BadRequestError('입력형식이 올바르지 않습니다. 다시 한번 확인해 주세요 ※날짜는 2019-05-20 형식입니다. ')
            }
        }
        let list = await todoService.modifyList(req)

        let msg = {
            message: "수정하였습니다",
        }
        return res.status(200).json(msg)
    } catch (e) {
        console.log(e)
        return res.status(e.code).json(e)
    }

});

/**
 * TODO 삭제하는 API
 * 수정하기 전 Joi.verifyDeleteTodo 통해 스키마범위를 확인한다.
 * @param {id} obj 삭제에 필요한 키값인 id를 받는다.
 * @return {JSON} 성공시 200코드 반환,
 * 그 외 에러일 경우 500코드와 에러메세지 반환
 */
router.delete('/', async function(req, res) {

    try {
        let result = Joi.verifyDeleteTodo(req)
        console.log(result)
        if (result.error !== null) {
            throw new BadRequestError('id값이 올바르지 않습니다.')
        }
        let list = await todoService.deleteList(req)
        let msg = {
            message: "삭제하였습니다",
        }
        return res.status(200).json(msg)
    } catch (e) {
        return res.status(e.code).json(e)
    }
});

module.exports = router;