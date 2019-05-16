var express = require('express');
var router = express.Router();
var listMaster = require('../models').list_master
var logger = require('../config/logger')
const Sequelize = require('sequelize');
var moment = require('moment');

// TODO 조회
router.get('/', async function(req, res) {

    const Op = Sequelize.Op
    console.log(req.query)
    var list = await listMaster.findAll({
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
    res.status(200).json(list)

});

// TODO 작성
router.post('/', async function(req, res) {

    if (req.body.LIST_EXPIRE !== null && req.body.LIST_EXPIRE.trim() === "")
        req.body.LIST_EXPIRE = null;
    var list = await listMaster.create({
        LIST_TITLE: req.body.LIST_TITLE,
        LIST_CONTENT: req.body.LIST_CONTENT,
        LIST_EXPIRE: req.body.LIST_EXPIRE
    })

    var msg = {
        message: "작성하였습니다",
        list_id: list.LIST_ID,
        list_created_time: list.LIST_CREATED_TIME
    }
    res.status(200).json({ msg })
});

// TODO 수정
router.put('/', async function(req, res) {

    if (req.body.LIST_EXPIRE !== null && req.body.LIST_EXPIRE.trim() === "")
        req.body.LIST_EXPIRE = null;

    await listMaster.update({
        LIST_TITLE: req.body.LIST_TITLE,
        LIST_CONTENT: req.body.LIST_CONTENT,
        LIST_EXPIRE: req.body.LIST_EXPIRE
    }, {
        where: { LIST_ID: req.body.LIST_ID }
    })

    res.status(200).json({ message: "수정하였습니다." })
});

// TODO 삭제
router.delete('/', async function(req, res) {
    console.log(req.query)
    await listMaster.destroy({
        where: { LIST_ID: req.query.LIST_ID }
    })

    res.status(200).json({ message: "삭제하였습니다." })
});

// TODO 우선순위
router.post('/priority', async function(req, res) {

    await listMaster.create({
        LIST_TITLE: req.body.list_title,
        LIST_CONTENT: req.body.list_content,
        LIST_EXPIRE: req.body.list_expire
    })
    res.status(200).json({ message: "작성하였습니다." })
});

// TODO 마감된 항목 보기
router.get('/expire', async function(req, res) {
    const Op = Sequelize.Op
    var list = await listMaster.findAll({
        attributes: ['LIST_ID', 'LIST_TITLE', 'LIST_CONTENT', 'LIST_CREATED_TIME', 'LIST_EXPIRE', 'LIST_PRIORITY'],
        where: {
            LIST_COMPLETE: 0,
            LIST_EXPIRE: {
                [Op.lt]: moment().format("YYYY-MM-DD")
            }
        }
    })

    res.status(200).json(list)

});

// TODO 완료된 항목 보기
router.get('/complete', async function(req, res) {

    var list = await listMaster.findAll({
        attributes: ['LIST_ID', 'LIST_TITLE', 'LIST_CONTENT', 'LIST_CREATED_TIME', 'LIST_EXPIRE', 'LIST_PRIORITY'],
        where: {
            LIST_COMPLETE: 1
        }
    })
    res.status(200).json(list)

});

// TODO 완료처리
router.put('/complete', async function(req, res) {

    await listMaster.update({
        LIST_COMPLETE: req.body.LIST_COMPLETE
    }, {
        where: { LIST_ID: req.body.LIST_ID }
    })
    res.status(200).json({ message: "완료하였습니다." })
});
module.exports = router;