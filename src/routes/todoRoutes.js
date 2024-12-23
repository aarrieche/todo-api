const express = require('express');
const {
  createTodo,
  listTodos,
  listPendingTodos,
  listOverdueTodos,
  markTodoAsCompleted,
} = require('../controllers/todoController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, createTodo);
router.get('/', authenticateUser, listTodos);
router.get('/pending', authenticateUser, listPendingTodos);
router.get('/overdue', authenticateUser, listOverdueTodos);
router.patch('/:id/complete', authenticateUser, markTodoAsCompleted);

module.exports = router;
