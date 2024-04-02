const router = require('express').Router();
// Import the Post model from the models folder
const { Comment } = require('../../models');

// If a POST request is made to /api/Posts, a new Post is created. If there is an error, the function returns with a 400 error. 
router.post('/:post_id', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.post_id
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a DELETE request is made to /api/Posts/:id, that Post is deleted. 
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
