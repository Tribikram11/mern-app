const express = require('express');
const router = express.Router();

const {
    createUser,
    readById,
    readWithFilter,
    updateUser,
    deleteUser

    } = require('../controllers/userController')

router.get('/',readWithFilter);
router.post('/',createUser)

router.get('/:id',readById)
router.put('/:id',updateUser)
router.delete('/:id', deleteUser)

module.exports =router;