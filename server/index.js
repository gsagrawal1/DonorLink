require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const app = express()

const PORT = process.env.PORT || 2911

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("MongoDb connected")).catch(err => console.log("MongoDB connection error:", err));
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser());
const cors = require("cors");
app.use(cors({
  origin: ["http://localhost:5173", "https://donor-link-one.vercel.app"], // Frontend URL
  credentials: true, // Allow cookies if needed
}));

const {checkForAuthenticationCookie} = require('./middlewares/authentication')
const {authorize} = require('./middlewares/authorization')
const staticRoutes = require('./routes/static')
const userRoutes = require('./routes/user')

app.use("/api", staticRoutes)
app.use("/api/user",checkForAuthenticationCookie, userRoutes)


app.listen(PORT , () => {
    console.log("Server Started at :" + PORT)
})
