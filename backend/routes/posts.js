const express = require('express');


const postController = require('../controllers/posts');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const router = express.Router();



router.post('', checkAuth, extractFile, postController.createPost);


router.put('/:id', checkAuth, extractFile, postController.updatePost);

router.get('', postController.getPosts);

router.get('/:id', postController.getOnePost);

router.delete('/:id', checkAuth, postController.deletePost);

module.exports = router;
