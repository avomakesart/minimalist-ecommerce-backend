const express = require('express')
const router = express.Router()

const {
    create,
    productById,
    // read,
    // remove,
    // update,
    // list,
    // listRelated,
    // listCategories,
    // listBySearch,
    // photo,
    // listSearch,
} = require('../controllers/review')
const { requireSignin, isAuth } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.get('/product/:productId', read)
router.post('/k/create/:userId', requireSignin, isAuth, create)
// router.delete('/product/:productId/:userId', requireSignin, isAuth,)
// router.put('/product/:productId/:userId', requireSignin, isAuth,)

// router.get('/products', list)
// router.get('/products/search', listSearch)
// router.get('/products/related/:productId', listRelated)
// router.get('/products/categories', listCategories)
// router.post('/products/by/search', listBySearch)
// router.get('/product/photo/:productId', photo)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router
