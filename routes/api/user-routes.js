const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUsers,
    updateUser,
    deleteUser 
 } = require('../../controllers/user-controller')

router
.route('/')
.get(getAllUsers)
.post(createUsers)

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

module.exports = router;