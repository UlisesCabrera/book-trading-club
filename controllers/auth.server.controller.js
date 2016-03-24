exports.failure = function(req, res){
	// when this route is requested send failure state to client
	res.send({state: 'failure', user: null, message: 'user already exists'});
};

exports.socialLoginLogic = {
		 successRedirect: '/',
         failureRedirect: '/'
};

exports.localLoginLogic  = {
	// if success go to home page, if not redirect to failure route 
	// which will send failure state to client.
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash : true
};

exports.logout = function(req, res) {
	// only works if there an actual user logged in.
	if (req.user) {
		req.logout();
		res.redirect('/');
	}
};