const router = require('express').Router();
const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth');
// GET all posts for homepage

// router.get('/', withAuth, async (req, res) => {

router.get('/', async (req, res) => {

  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
        },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      ],
    });

    const posts = dbPostData.map((Post) =>
      Post.get({ plain: true })
    );
    console.log(posts);
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
    // res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
        },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      ],
    });

    const userData = dbUserData.get({ plain: true })

    console.log(userData);
    res.render('dashboard', {
      userData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});


module.exports = router;
