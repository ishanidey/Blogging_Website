const User = require('../models/user');

const user_register_get = (req, res) => {
  res.render('register', { title: 'Register' });
};

const user_register_post = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
};

const user_login_get = (req, res) => {
  res.render('login', { title: 'Login' });
};

const user_login_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.loggedIn = true;
      res.redirect('/blogs');
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
};

module.exports = {
  user_register_get,
  user_register_post,
  user_login_get,
  user_login_post
};
