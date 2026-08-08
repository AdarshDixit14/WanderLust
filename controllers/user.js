const User  = require("../models/user");

module.exports.renderSignupForm  = (req, res) => {
    res.render("users/signup");
};

module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login");
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }

  module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err){
          return next(err);
        
         }
          req.flash("success", "You are Logged Out!");
          res.redirect("/listings");
    })
}