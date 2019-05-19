const listMaster = require('../models').list_master
const logger = require('../config/logger')
const InvalidRequestError = require('../constants/error/InvalidRequestError')

module.exports = {

    /**
     * DB에 저장되어 있는 TODO들을 불러온다.
     * @return {JSON} 성공시 TODO 리스트 반환
     * 그 외 에러일 경우 500코드와 에러메세지 반환
     */
    getList: async function(req, res) {
        try {
            let list = await listMaster.findAll({})
            return list
        } catch (e) {

            logger.error('Todo 조회시 에러발생 ' + e.parent.code + ' ' + e.parent.sqlMessage)
            throw new InvalidRequestError('Todo 조회시 서버의 DB에서 에러가발생하였습니다.')
        }
    },

    /**
     * DB에 TODO를 생성하며, 우선순위를 위해 
     * DB에 있는 컬럼 개수들을 조회하고 거기에 +1을 하여 TODO제목과 같이 저장한다
     * @param {title} obj TODO 제목을 받는다.
     * @return {JSON} 성공시 리스트 반환
     * 그 외 에러일 경우 500코드와 에러메세지 반환
     */
    setList: async function(req, res) {
        try {

            const size = await listMaster.count()
            let list = await listMaster.create({
                title: req.body.title,
                priority: size + 1
            })
            return list
        } catch (e) {

            logger.error('Todo 추가시 에러발생 ', +e.parent.code + ' ' + e.parent.sqlMessage)
            throw new InvalidRequestError('Todo 추가시 서버의 DB에서 에러가발생하였습니다.')
        }
    },

    /**
     * DB에 저장되어있는 TODO를 수정한다.
     * 파라미터가 배열일 경우 우선순위를 수정하며,
     * 배열이 아닐경우 제목,내용,만료일 수정 및 TODO 완료처리를 수정한다
     * 수정하기 전 expire가 null값인지 '' 값인지 확인한다.
     * @param {id, title, content, complete, created_time, expire, priority} obj
     * 수정에 필요한 키값인 id와 수정할 내용 title, content, complete, created_time,expire, priority를 받는다.
     * @return {JSON} 성공시 리스트 반환
     * 그 외 에러일 경우 500코드와 에러메세지 반환
     */
    modifyList: async function(req, res) {
        try {

            if (Array.isArray(req.body)) {

                let list = req.body.forEach(function(element, idx) {

                    if (element.expire !== null && element.expire.trim() === "")
                        element.expire = null;
                    listMaster.update({
                        title: element.title,
                        content: element.content,
                        expire: element.expire,
                        complete: req.body.complete,
                        priority: idx + 1
                    }, {
                        where: { id: element.id }
                    })

                })
                return list;
            } else {
                if (req.body.expire !== null && req.body.expire.trim() === "")
                    req.body.expire = null;

                let list = await listMaster.update({
                    title: req.body.title,
                    content: req.body.content,
                    expire: req.body.expire,
                    priority: req.body.priority,
                    complete: req.body.complete
                }, {
                    where: { id: req.body.id }
                })
                return list;
            }
        } catch (e) {
            logger.error('Todo 수정시 에러발생 ' + e.parent.code + ' ' + e.parent.sqlMessage)
            throw new InvalidRequestError('Todo 수정시 서버의 DB에서 에러가발생하였습니다.')
        }
    },
    /**
     * DB에 존재하는 TODO를 삭제한다
     * @param {id} obj 삭제에 필요한 키값인 id를 받는다.
     * @return {JSON} 성공시 리스트반환
     * 그 외 에러일 경우 500코드와 에러메세지 반환
     */
    deleteList: async function(req, res) {
        try {
            let list = await listMaster.destroy({
                where: { id: req.query.id }
            })
            return list;
        } catch (e) {
            logger.error('Todo 삭제시 에러발생 ', +e.parent.code + ' ' + e.parent.sqlMessage)
            throw new InvalidRequestError('Todo 삭제시 서버의 DB에서 에러가발생하였습니다.')
        }
    },

}