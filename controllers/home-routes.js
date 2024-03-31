const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// TODO: Import the custom middleware
const withAuth = require('../utils/auth');
// GET all posts for homepage
router.get('/', withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });

    const posts = dbPostData.map((Post) =>
      Post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Post
// TODO: Replace the logic below with the custom middleware
router.get('/post/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

  // If the user is logged in, allow them to view the Post
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });
    const Post = dbPostData.get({ plain: true });
    res.render('Post', { Post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

// GET one User
router.get('/user/:username', withAuth, async (req, res) => {

  // If the user is logged in, allow them to view the User
  try {
    const dbUserData = await User.findOne(
      {
        where: username = req.params.username,
        include: [
          {
            model: Post,
          },
          {
            model: Comment,
          },
        ],
      });

    const User = dbUserData.get({ plain: true });

    res.render('User', { User, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
