const express = require('express');
const { createTodo, allTodos,updateTodo, deleteTodo } = require('../controllers/todo.controller');
const router = express.Router();

router.post('/create',createTodo);
//router.post('/update',updateTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
//router.delete('/delete',deleteTodo);
router.get('/', allTodos);

module.exports = router;