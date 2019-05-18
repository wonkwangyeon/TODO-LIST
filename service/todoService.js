const listMaster = require('../models').list_master
const logger = require('../config/logger')
const InvalidRequestError = require('../error/InvalidRequestError')

module.exports = {
    getList: async function(req, res) {
        try {
            let list = await listMaster.findAll({})
            return list
        } catch (e) {

            logger.error('현재 List 조회시 에러발생 ' + e.parent.code + ' ' + e.parent.sqlMessage)
            throw new InvalidRequestError('현재 List 조회시 에러발생 ' + e.parent.sqlMessage)
        }
    },
    // getList: async function(req, res) {
    //     const Op = Sequelize.Op
    //     try {
    //         let list = await listMaster.findAll({
    //             attributes: ['id', 'title', 'content', 'created_time', 'expire', 'priority'],
    //             where: {
    //                 complete: 0,
    //                 [Op.or]: [{
    //                         expire: {
    //                             [Op.gte]: moment().format("YYYY-MM-DD")
    //                         }
    //                     },
    //                     { expire: null }
    //                 ]
    //             }
    //         })
    //         return list
    //     } catch (e) {

    //         logger.error('현재 List 조회시 에러발생 ' + e.parent.code + ' ' + e.parent.sqlMessage)
    //         throw new InvalidRequestError('현재 List 조회시 에러발생 ' + e.parent.sqlMessage)
    //     }
    // },
    setList: async function(req, res) {
        try {
            console.log(req.body.priority)
            let list = await listMaster.create({
                title: req.body.title,
                priority: req.body.priority
            })
            return list
        } catch (e) {

            logger.debug('List 추가시 에러발생 ', +e.parent.code + ' ' + e.parent.sqlMessage)
            throw new InvalidRequestError('List 추가시 에러발생 ' + e.parent.sqlMessage)
        }
    },
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
                    priority: req.body.priority
                }, {
                    where: { id: req.body.id }
                })
                return list;
            }
        } catch (e) {
            logger.error('List 수정시 에러발생 ' + e.parent.code + ' ' + e.parent.sqlMessage)
            throw new InvalidRequestError('List 수정시 에러발생 ' + e.parent.sqlMessage)
        }
    },
    deleteList: async function(req, res) {
        try {
            let list = await listMaster.destroy({
                where: { id: req.query.id }
            })
            return list;
        } catch (e) {
            logger.error('List 삭제시 에러발생 ', +e.parent.code + ' ' + e.parent.sqlMessage)
            throw new InvalidRequestError('List 삭제시 에러발생 ' + e.parent.sqlMessage)
        }
    },
    // setPriority: async function(req, res) {
    //     try {

    //     } catch (e) {
    //         logger.error('List 조회시 에러발생 ', +e.parent.code + ' ' + e.parent.sqlMessage)
    //         throw new InvalidRequestError('List 추가시 에러발생 ' + e.parent.sqlMessage)
    //     }
    // },
    // getExpireList: async function(req, res) {
    //     try {
    //         const Op = Sequelize.Op
    //         let list = await listMaster.findAll({
    //             attributes: ['id', 'title', 'content', 'created_time', 'expire', 'priority'],
    //             where: {
    //                 complete: 0,
    //                 expire: {
    //                     [Op.lt]: moment().format("YYYY-MM-DD")
    //                 }
    //             }
    //         })
    //         return list
    //     } catch (e) {
    //         logger.error('마감이 지난 List 조회시 에러발생 ', +e.parent.code + ' ' + e.parent.sqlMessage)
    //         throw new InvalidRequestError('마감이 지난 List 조회시 에러발생 ' + e.parent.sqlMessage)
    //     }
    // },

    // getCompleteList: async function(req, res) {
    //     try {
    //         let list = await listMaster.findAll({
    //             attributes: ['id', 'title', 'content', 'created_time', 'expire', 'priority'],
    //             where: {
    //                 complete: 1
    //             }
    //         })
    //         return list
    //     } catch (e) {
    //         logger.error('완료된 List 조회시 에러발생 ', +e.parent.code + ' ' + e.parent.sqlMessage)
    //         throw new InvalidRequestError('완료된 List 조회시 에러발생 ' + e.parent.sqlMessage)
    //     }
    // },
    // setComplete: async function(req, res) {
    //     try {
    //         let list = await listMaster.update({
    //             complete: req.body.complete
    //         }, {
    //             where: { id: req.body.id }
    //         })
    //         return list
    //     } catch (e) {
    //         logger.error('List 완료처리시 에러발생 ', +e.parent.code + ' ' + e.parent.sqlMessage)
    //         throw new InvalidRequestError('List 완료처리시 에러발생 ' + e.parent.sqlMessage)
    //     }
    // },
}