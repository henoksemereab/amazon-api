
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Success !",
	});
});

app.post("/payment/create", async(req, res)=>{

    const total = req.query.total

    if(total> 0){
        // console.log("Payment reiceved", total);
        // res.send(total);

        const paymnetIntent =  await stripe.paymentIntents.create({
            amount: total,
            currency: "USD"
        })
        console.log(paymnetIntent);
        res.status(201).json({
        clientSecret:paymnetIntent.client_secret,

        })
    }else{
        res.status(403).json({
            message:"total must be greater thn 0"
        })
    }
})

const port = 5000
app.listen(port, ()=>{
    // if(err) throw err;
    console.log(`Amazon Server Running on PORT: ${port}, http://localhost:${port}`);

})
