const router = require('express').Router();
// Import the Post model from the models folder
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {

    try {
      const dbPostData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['username']},
          { model: Comment, include: [{ model: User, attributes: ['username'] }] },
        ]
      });

      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.post('/new', withAuth, async (req, res) => {

  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
console.log(req.params.id,"req.params.id")
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).end();
      return;
    }

    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [rows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (rows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
