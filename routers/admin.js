const express = require('express');
const {allTodos} = require("../controllers/admin.controller.js")
const router = express.Router();
router.get('/',(req,res)=>{
    let user = req.user;
    try {
        res.json({
            message:"this is admin Route",
            Role: user.role
        })
    } catch (error) {
        res.json({message: "Some Error in admin.js"})
    }
})

router.get('/all',allTodos);

module.exports = router;