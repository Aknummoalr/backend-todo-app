const UserModel = require('../models/userModel.js');
const { tokenMaker } = require('../helpers/tokenMaker');
async function loginUser(req,res,next){
    try {
        let {username, password}= req.body;

        if(!username || !password){
            res.json({Messgae:"something missing"});
        }

        const user = await UserModel.findOne({username});
        if(!user){
            return res.status(404).json({message:"user does not exists, Please Register"})
        }

        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const token = tokenMaker({username:user.username,
                                    id: user._id, role: user.role});

        res.status(201).json({
            message:"User Signed In successfully",
            token,
            user:{
                username:user.username,
                id:user._id,
                role:user.role
            }
        })
        return;
        
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }

}

async function registerUser(req, res, next) {
    try {
        let { username, password, role } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = new UserModel({ username, password, role });
        await user.save();

        const token = tokenMaker({ 
            id: user._id, 
            username: user.username, 
            role: user.role
        });
        return res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                role:user.role
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
}
module.exports = {loginUser, registerUser}