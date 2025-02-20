const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const CartItemSchema = new mongoose.Schema(
    {
        product: { type: ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        count: Number,
    },
    { timestamps: true }
)

const CartItem = mongoose.model('CartItem', CartItemSchema)

const OrderSchema = new mongoose.Schema(
    {
        products: [CartItemSchema],
        transaction_id: {},
        amount: { type: Number },
        first_name: { type: String },
        last_name: { type: String },
        address: { type: String },
        company: { type: String },
        city: { type: String },
        country: { type: String }, 
        state: { type: String },
        zip_code: { type: String }, 
        phone: { type: String }, 
        status: {
            type: String,
            default: 'Not processed',
            enum: [
                'Not processed',
                'Processing',
                'Shipped',
                'Delivered',
                'Cancelled',
            ], // enum means string objects
        },
        updated: Date,
        user: { type: ObjectId, ref: 'User' },
    },
    { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)

module.exports = { Order, CartItem }
