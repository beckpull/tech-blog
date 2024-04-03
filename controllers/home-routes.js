const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
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

    console.log(req.session.loggedIn);
    // const loggedIn = req.session.loggedIn;
    // console.log(loggedIn);

    res.render('homepage', { posts, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// // GET one User
router.get('/user/:id', withAuth, async (req, res) => {

  // If the user is logged in, allow them to view the User
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Post,
        },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      ],
    });

    const userData = dbUserData.get({ plain: true });
    // res.json(userData);
    res.render('user', { userData, loggedIn: req.session.loggedIn });
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
