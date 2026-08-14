const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


// ======================================
// CREATE ORDER
// ======================================

app.post("/create-order", async (req, res) => {

    try {

        const { amount } = req.body;


        if (!amount || amount <= 0) {

            return res.status(400).json({
                error: "Invalid amount"
            });

        }


        const options = {

            amount: Math.round(amount * 100),

            currency: "INR",

            receipt:
                "receipt_" +
                Date.now()

        };


        const order =
            await razorpay.orders.create(
                options
            );


        res.json(order);


    } catch (error) {

        console.error(error);


        res.status(500).json({
            error:
                "Unable to create Razorpay order"
        });

    }

});


// ======================================
// SERVER
// ======================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});