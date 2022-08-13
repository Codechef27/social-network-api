const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUsers,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend 
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

router.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(deleteFriend)

module.exports = router;