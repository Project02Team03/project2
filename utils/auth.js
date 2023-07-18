const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    // If the user is not logged in, redirect them to the login page or send an error response
    return res.status(401).redirect('/login'); // Redirect to login page
    //send error response
  }
  next(); // If the user is logged in, continue to the next middleware or route handler
};

module.exports = withAuth;

