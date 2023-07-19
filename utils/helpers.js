const withOption = (req, res, next) => {
    // If the user isn't logged in, redirect them to the login route
    if (req.session.logged_in) {
      res.json({logged_in: req.session.logged_in});
    } else {
      next();
    }
  };
  
  module.exports = withOption;
