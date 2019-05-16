const listMaster = require('../models').list_master
const logger = require('../config/logger')
const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = {
    getList: async function(req, res) {
        const Op = Sequelize.Op
        try {
            let list = await listMaster.findAll({
                attributes: ['LIST_ID', 'LIST_TITLE', 'LIST_CONTENT', 'LIST_CREATED_TIME', 'LIST_EXPIRE', 'LIST_PRIORITY'],
                where: {
                    LIST_COMPLETE: 0,
                    [Op.or]: [{
                            LIST_EXPIRE: {
                                [Op.gte]: moment().format("YYYY-MM-DD")
                            }
                        },
                        { LIST_EXPIRE: null }
                    ]
                }
            })
            return list
        } catch (e) {
            logger.error('현재 List 조회시 에러발생', e)
            throw new Error({ message: '현재 List조회시 DB 에러발생' });
        }
    },
    setList: async function(req, res) {
        try {
            if (req.body.LIST_EXPIRE !== null && req.body.LIST_EXPIRE.trim() === "")
                req.body.LIST_EXPIRE = null;
            let list = await listMaster.create({
                LIST_TITLE: req.body.LIST_TITLE,
                LIST_CONTENT: req.body.LIST_CONTENT,
                LIST_EXPIRE: req.body.LIST_EXPIRE
            })
            return list
        } catch (e) {
            logger.error('List 추가시 에러발생', e)
            throw new Error({ message: 'List 추가시 DB 에러발생' });
        }
    },
    modifyList: async function(req, res) {
        try {
            if (req.body.LIST_EXPIRE !== null && req.body.LIST_EXPIRE.trim() === "")
                req.body.LIST_EXPIRE = null;

            await listMaster.update({
                LIST_TITLE: req.body.LIST_TITLE,
                LIST_CONTENT: req.body.LIST_CONTENT,
                LIST_EXPIRE: req.body.LIST_EXPIRE
            }, {
                where: { LIST_ID: req.body.LIST_ID }
            })
        } catch (e) {
            logger.error('List 수정시 에러발생', e)
            throw new Error({ message: 'List 수정시 DB 에러발생' });
        }
    },
    deleteList: async function(req, res) {
        try {
            await listMaster.destroy({
                where: { LIST_ID: req.query.LIST_ID }
            })
        } catch (e) {
            logger.error('List 삭제시 에러발생', e)
            throw new Error({ message: 'List 삭제시 DB 에러발생' });
        }
    },
    setPriority: async function(req, res) {
        try {

        } catch (e) {
            logger.error('List 조회시 에러발생', e)
            throw new Error({ message: 'List 조회시 DB 에러발생' });
        }
    },
    getExpireList: async function(req, res) {
        try {
            const Op = Sequelize.Op
            let list = await listMaster.findAll({
                attributes: ['LIST_ID', 'LIST_TITLE', 'LIST_CONTENT', 'LIST_CREATED_TIME', 'LIST_EXPIRE', 'LIST_PRIORITY'],
                where: {
                    LIST_COMPLETE: 0,
                    LIST_EXPIRE: {
                        [Op.lt]: moment().format("YYYY-MM-DD")
                    }
                }
            })
            return list
        } catch (e) {
            logger.error('마감이 지난 List 조회시 에러발생', e)
            throw new Error({ message: '마감이 지난 List 조회시 DB 에러발생' });
        }
    },

    getCompleteList: async function(req, res) {
        try {
            let list = await listMaster.findAll({
                attributes: ['LIST_ID', 'LIST_TITLE', 'LIST_CONTENT', 'LIST_CREATED_TIME', 'LIST_EXPIRE', 'LIST_PRIORITY'],
                where: {
                    LIST_COMPLETE: 1
                }
            })
            return list
        } catch (e) {
            logger.error('완료된 List 조회시 에러발생', e)
            throw new Error({ message: '완료된 List 조회시 DB 에러발생' });
        }
    },
    setComplete: async function(req, res) {
        try {
            await listMaster.update({
                LIST_COMPLETE: req.body.LIST_COMPLETE
            }, {
                where: { LIST_ID: req.body.LIST_ID }
            })
        } catch (e) {
            logger.error('List 완료처리시 에러발생', e)
            throw new Error({ message: 'List 완료처리시 DB 에러발생' });
        }
    },
}