const express = require('express');
const {
  createCategory,
  listCategories,
  shareCategory,
  listSharedCategories,
} = require('../controllers/categoryController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, createCategory);
router.get('/', authenticateUser, listCategories);
router.post('/:id/share', authenticateUser, shareCategory);
router.get('/shared', authenticateUser, listSharedCategories);

module.exports = router;
