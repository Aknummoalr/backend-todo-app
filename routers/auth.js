const express = require("express");
const { loginUser, registerUser } = require("../controllers/auth.controller");
const router = express.Router();

router.post('/login', loginUser);
router.post('/register',registerUser);
router.get('/abcd',()=>{
    console.log("abcd route");
})

module.exports = router;