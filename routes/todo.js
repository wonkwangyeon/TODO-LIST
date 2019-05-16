const express = require('express');
const router = express.Router();
const logger = require('../config/logger')
const todoService = require('../service/todoService')
const InvalidRequestEroor = require('../error/InvalidRequestError')
const errorMsg = {
    message: "서버에러",
}

// TODO 조회
router.get('/', async function(req, res) {
    try {
        // let list = await todoService.getList()
        return res.status(200).json(InvalidRequestEroor('sss'))
    } catch (e) {
        return res.status(500).json(errorMsg)
    }
});

// TODO 작성
router.post('/', async function(req, res) {
    try {
        let list = await todoService.setList(req)

        var msg = {
            message: "작성하였습니다",
            list_id: list.LIST_ID,
            list_created_time: list.LIST_CREATED_TIME
        }
        return res.status(200).json(msg)
    } catch (e) {
        return res.status(500).json(errorMsg)
    }

});

// TODO 수정
router.put('/', async function(req, res) {

    try {
        let list = await todoService.modifyList(req)

        var msg = {
            message: "수정하였습니다",
        }
        return res.status(200).json(msg)
    } catch (e) {
        return res.status(500).json(errorMsg)
    }

});

// TODO 삭제
router.delete('/', async function(req, res) {

    try {
        let list = await todoService.deleteList(req)
        let msg = {
            message: "삭제하였습니다",
        }
        return res.status(200).json(msg)
    } catch (e) {
        return res.status(500).json(errorMsg)
    }
});

// TODO 우선순위
router.post('/priority', async function(req, res) {

    // await listMaster.create({
    //     LIST_TITLE: req.body.list_title,
    //     LIST_CONTENT: req.body.list_content,
    //     LIST_EXPIRE: req.body.list_expire
    // })
    return res.status(200).json({ message: "작성하였습니다." })
});

// TODO 마감된 항목 보기
router.get('/expire', async function(req, res) {
    try {
        let list = await todoService.getExpireList()
        return res.status(200).json(list)
    } catch (e) {
        return res.status(500).json(errorMsg)
    }
});

// TODO 완료된 항목 보기
router.get('/complete', async function(req, res) {
    try {
        let list = await todoService.getCompleteList()
        return res.status(200).json(list)
    } catch (e) {
        return res.status(500).json(errorMsg)
    }
});

// TODO 완료처리
router.put('/complete', async function(req, res) {
    try {
        await todoService.setComplete(req)
        let msg = {}
        if (Number(req.body.LIST_COMPLETE) === 1) {
            msg.meesage = "완료하였습니다."
        } else {
            msg.meesage = "완료취소하였습니다."
        }
        return res.status(200).json(msg)
    } catch (e) {
        return res.status(500).json(errorMsg)
    }
});
module.exports = router;