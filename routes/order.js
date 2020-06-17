const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { userById, addOrderToUserHistory } = require('../controllers/user')
const {
    create,
    listOrders,
    getStatusValues,
    orderById,
    updateOrderStatus,
} = require('../controllers/order')
const { decreaseQuantity } = require('../controllers/product')
const { resolve } = require('path')
// This is your real test secret API key.
const stripe = require('stripe')(
    'sk_test_51GtHH0F36VywMuvUlEz5rTEnQTOb86GxZxDMd2AMsPtAEnhVQjPAQzgiZwMXS73yhF81WX9xk22o8xv2GQWqUp3Q00NYa6ASa6'
)


const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400
}
router.post('/create-payment-intent', async (req, res) => {
    const { items } = req.body
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'usd',
    })
    res.send({
        clientSecret: paymentIntent.client_secret,
    })
})


router.post(
    '/order/create/:userId',
    requireSignin,
    isAuth,
    addOrderToUserHistory,
    decreaseQuantity,
    create
)

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders)
router.get(
    '/order/status-values/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    getStatusValues
)
router.put(
    '/order/:orderId/status/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    updateOrderStatus
)

router.param('userId', userById)
router.param('orderId', orderById)

module.exports = router
