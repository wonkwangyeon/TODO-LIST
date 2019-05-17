const listMaster = require('../models').list_master
const logger = require('../config/logger')
const Sequelize = require('sequelize');
const moment = require('moment');
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
    //             attributes: ['LIST_ID', 'LIST_TITLE', 'LIST_CONTENT', 'LIST_CREATED_TIME', 'LIST_EXPIRE', 'LIST_PRIORITY'],
    //             where: {
    //                 LIST_COMPLETE: 0,
    //                 [Op.or]: [{
    //                         LIST_EXPIRE: {
    //                             [Op.gte]: moment().format("YYYY-MM-DD")
    //                         }
    //                     },
    //                     { LIST_EXPIRE: null }
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
            if (req.body.LIST_EXPIRE !== null && req.body.LIST_EXPIRE.trim() === "")
                req.body.LIST_EXPIRE = null;
            let list = await listMaster.create({
                LIST_TITLE: req.body.LIST_TITLE,
                LIST_CONTENT: req.body.LIST_CONTENT,
                LIST_EXPIRE: req.body.LIST_EXPIRE,
                LIST_PRIORITY: req.body.LIST_PRIORITY
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

                await req.body.forEach(function(element) {
                    if (element.LIST_EXPIRE !== null && element.LIST_EXPIRE.trim() === "")
                        element.LIST_EXPIRE = null;

                    listMaster.update({
                        LIST_TITLE: element.LIST_TITLE,
                        LIST_CONTENT: element.LIST_CONTENT,
                        LIST_EXPIRE: element.LIST_EXPIRE,
                        LIST_PRIORITY: element.LIST_PRIORITY
                    }, {
                        where: { LIST_ID: element.LIST_ID }
                    })
                })
                return true;
            } else {
                if (req.body.LIST_EXPIRE !== null && req.body.LIST_EXPIRE.trim() === "")
                    req.body.LIST_EXPIRE = null;

                let list = await listMaster.update({
                    LIST_TITLE: req.body.LIST_TITLE,
                    LIST_CONTENT: req.body.LIST_CONTENT,
                    LIST_EXPIRE: req.body.LIST_EXPIRE,
                    LIST_PRIORITY: req.body.LIST_PRIORITY
                }, {
                    where: { LIST_ID: req.body.LIST_ID }
                })
                return true;
            }
        } catch (e) {
            logger.error('List 수정시 에러발생 ' + e.parent.code + ' ' + e.parent.sqlMessage)
            throw new InvalidRequestError('List 수정시 에러발생 ' + e.parent.sqlMessage)
        }
    },
    deleteList: async function(req, res) {
        try {
            let list = await listMaster.destroy({
                where: { LIST_ID: req.query.LIST_ID }
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
    //             attributes: ['LIST_ID', 'LIST_TITLE', 'LIST_CONTENT', 'LIST_CREATED_TIME', 'LIST_EXPIRE', 'LIST_PRIORITY'],
    //             where: {
    //                 LIST_COMPLETE: 0,
    //                 LIST_EXPIRE: {
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
    //             attributes: ['LIST_ID', 'LIST_TITLE', 'LIST_CONTENT', 'LIST_CREATED_TIME', 'LIST_EXPIRE', 'LIST_PRIORITY'],
    //             where: {
    //                 LIST_COMPLETE: 1
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
    //             LIST_COMPLETE: req.body.LIST_COMPLETE
    //         }, {
    //             where: { LIST_ID: req.body.LIST_ID }
    //         })
    //         return list
    //     } catch (e) {
    //         logger.error('List 완료처리시 에러발생 ', +e.parent.code + ' ' + e.parent.sqlMessage)
    //         throw new InvalidRequestError('List 완료처리시 에러발생 ' + e.parent.sqlMessage)
    //     }
    // },
}