const todoModel = require("../models/todoModel");
async function allTodos(req,res){
    try {
        const u = req.user;
        console.log(u)
        let result = await todoModel.find({
            // userId:u.id
        }).populate('userId')
        
        let ans = result.map((ob)=>{
            let newob = {
                ...ob,
                name:ob.userId.username,
            }

            return newob
        })
        res.json({
            ans
        })

        // console.log(result);
        // let ans = {
        //     ...result,
        //     name:result.userId.username
        // }
        // console.log(ans);
        // res.send({
        //     ans
        // })
        
    } catch (error) {
        res.json({
            message:"Error in allTodos.js function",
            Error: error
        })
    }
}

module.exports = { allTodos};