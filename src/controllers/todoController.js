const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTodo = async (req, res) => {
  const { title, description, dueDate, categoryId } = req.body;
  const userId = req.user.id;

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        userId,
        categoryId: categoryId || null,
      },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listTodos = async (req, res) => {
  const userId = req.user.id;

  try {
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { dueDate: 'asc' },
    });
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listPendingTodos = async (req, res) => {
  const userId = req.user.id;

  try {
    const todos = await prisma.todo.findMany({
      where: { userId, completed: false, dueDate: { gte: new Date() } },
    });
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listOverdueTodos = async (req, res) => {
  const userId = req.user.id;

  try {
    const todos = await prisma.todo.findMany({
      where: { userId, completed: false, dueDate: { lt: new Date() } },
    });
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.markTodoAsCompleted = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todo.update({
      where: { id: parseInt(id, 10) },
      data: { completed: true },
    });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
