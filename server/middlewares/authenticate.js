export default (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;
	if (authorizationHeader){
		token = authorizationHeader.split(' ')[1];
	}

	if (token){

	} else {
		res.status(403).json({
			error: 'No token provided'
		});
	}
}