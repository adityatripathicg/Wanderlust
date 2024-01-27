const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const { signup, signOut, renderSignUpForm, renderLoginForm, login } = require('../controllers/users.js');

//SignUp Route
router.route("/signup")
.get(renderSignUpForm)
.post(wrapAsync(signup));

//Login Route
router.route("/login")
.get(renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local", {failureRedirect : "/login", failureFlash : true}) ,wrapAsync(login));

//LogOut Route
router.get("/logout", signOut);

module.exports = router;