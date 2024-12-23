const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const category = await prisma.category.create({
      data: { name, userId },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listCategories = async (req, res) => {
  const userId = req.user.id;

  try {
    const categories = await prisma.category.findMany({
      where: { userId },
      include: { todos: true },
    });
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.shareCategory = async (req, res) => {
  const { id } = req.params;
  const { sharedWithUserId } = req.body;

  try {
    const sharedCategory = await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data: {
        sharedWith: {
          connect: { id: sharedWithUserId },
        },
      },
    });
    res.json(sharedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listSharedCategories = async (req, res) => {
  const userId = req.user.id;

  try {
    const sharedCategories = await prisma.category.findMany({
      where: {
        sharedWith: { some: { id: userId } },
      },
      include: { todos: true },
    });
    res.json(sharedCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
