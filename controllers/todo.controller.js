const todoModel = require("../models/todoModel");
const createTodo = async (req,res,next)=>{
    try {
        let u = req.user;
        const obj = {
            ...req.body,
            userId : u.id
        }

        console.log(obj);
        let todo = await todoModel.create(obj);
        res.json({
            message:"Todo Created",
            todo
        })
    } catch (error) {
        console.log("Error_from_Create_Todo :", error);
    }
}

const allTodos = async (req,res,next)=>{
    try {
        let u = req.user;
        const result = await todoModel.find({userId : u.id});
        res.json({
            message:"Todo Found",
            result
        }) 
    } catch (error) {
        console.log("Error_from_all_todos :", error);
    }
}


const updateTodo = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from URL params
        const updates = req.body;
        const userId = req.user.id;

        const updatedTodo = await todoModel.findOneAndUpdate(
            { 
                _id: id,
                userId
            },
            updates,
            { 
                new: true,
                runValidators: true
            }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found or access denied' });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deletedTodo = await todoModel.findOneAndDelete({
            _id: id,
            userId 
        });

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found or access denied' });
        }

        res.json({
            message: 'Todo deleted successfully',
            deletedTodo
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {createTodo,allTodos, updateTodo,deleteTodo};