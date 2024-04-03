const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
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

router.get('/new', withAuth, async (req, res) => {
    res.render('new', { loggedIn: req.session.loggedIn });
});

router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
        });

        const post = dbPostData.get({ plain: true });
        console.log(post);
        res.render('update', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/delete/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
        });

        const post = dbPostData.get({ plain: true });
        console.log(post);
        res.render('delete', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;