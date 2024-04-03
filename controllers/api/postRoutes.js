const router = require('express').Router();
// Import the Post model from the models folder
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    // If the user is logged in, allow them to view the Post
    try {
      const dbPostData = await Post.findByPk(req.params.id, {
        include: [
          { model: Comment, include: [{ model: User, attributes: ['username'] }] },
        ]
      });
      const post = dbPostData.get({ plain: true });
      console.log(post.comments);
      res.render('post', { post, loggedIn: req.session.loggedIn });
      // res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/new', withAuth, async (req, res) => {
      res.render('new', { loggedIn: req.session.loggedIn });
});

// If a POST request is made to /api/Posts, a new Post is created. If there is an error, the function returns with a 400 error. 
router.post('/new', withAuth, async (req, res) => {

  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
    // document.location.redirect('/dashboard');
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a DELETE request is made to /api/Posts/:id, that Post is deleted. 
router.delete('/:id', withAuth, async (req, res) => {

  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
