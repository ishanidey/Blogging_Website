const authMiddleware = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.session.user) {
      // User is not authenticated, redirect to the login page
      return res.redirect("/login");
    }
  
    // User is authenticated, proceed to the next middleware or route handler
    next();
  };
  
  module.exports = authMiddleware;
  
  