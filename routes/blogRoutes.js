const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/create', authMiddleware, blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router;