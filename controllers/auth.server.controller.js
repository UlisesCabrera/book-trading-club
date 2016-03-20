exports.socialLoginLogic = {
		 successRedirect: '/',
         failureRedirect: '/'
};

exports.logout = function(req, res) {
	// only works if there an actual user logged in.
	if (req.user) {
		req.logout();
		res.redirect('/');
	}
};