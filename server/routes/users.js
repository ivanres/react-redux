import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';

let router = express.Router();

function validateInput(data, otherValidations) {
	let { errors } = otherValidations(data);

	return Promise.all([
		User.where({ email: data.email }).fetch().then( user => {
			if (user) { errors.email = 'Email already exists'; }
		})
		,
		User.where({ username: data.username }).fetch().then( user => {
			if (user) { errors.username = 'Username already exists'; }
		})
	]).then(() => {
		return {
			errors,
			isValid: isEmpty(errors)
		}
	})
	
	

}

router.post('/', (req, res) => {
	console.log(req.body);

	validateInput(req.body, commonValidations).then( ({errors, isValid}) => {
		if (isValid){
			const { username, password, timezone, email} = req.body;
			const password_digest = bcrypt.hashSync(password, 10);

			User.forge({
				username, timezone, email, password_digest
			}, { hasTimestamps: true }).save()
			.then( user => res.json({ success: true}))
			.catch( err => res.status(500).json( { error: err }) );

		} else {
			res.status(400).json(errors);
		}
	} );

	

});

export default router;