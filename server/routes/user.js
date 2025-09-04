const express = require('express')
const { handleSignUp, handleLogin } = require('../controllers/user')
 
const router = express.Router()
router.get("/" , (req, res) => {
    if(!req.user) {
        return res.status(500).json({
            message : "Not login yet"
        })
    }
    return res.status(200).json({
        message : "Hello user",
        user : req.user
    })
})
router.get("/signin" , (req, res) => {
    return res.json({
        message : "Hello Wolrd"
    })
})
router.get("/login" , (req, res) => {
    return res.json({
        message : "Hello Wolrd"
    })
})


module.exports = 
    router
