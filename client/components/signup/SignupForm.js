import React from 'react';
import timezones from '../../data/timezones';
import classnames from 'classnames'
import validateInput from '../../../server/shared/validations/signup'

class SignupForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			timezone: '',
			errors: {},
			isLoading: false 
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	isValid(){
		const { errors, isValid } = validateInput(this.state);

		if (!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	onSubmit(e){ 
		e.preventDefault();
		this.setState({errors: {}, isLoading: true});
		if (this.isValid()){
			this.props.userSignupRequest(this.state)
				.then(
					() => {}
				) 
				.catch( 
					error => {
						console.log(error)
						this.setState({errors: error.response.data, isLoading: false})
						}
					);	
		}
		
	}

	render(){
		const { errors, isLoading } = this.state;
		const options = Object.keys(timezones).map(k =>
			<option key={timezones[k]} value={timezones[k]}>{k}</option>
			);

		return (
			<form onSubmit={this.onSubmit}>
				<h1>Join our community!</h1>

				<div className={classnames("form-group", { 'has-error': errors.username})}>
					<label className="control-label">Username</label>
					<input type="text" 
						value={this.state.username} 
						onChange={this.onChange}
						name="username" 
						className="form-control"
					/>
					{errors.username && <span className="help-block">{errors.username}</span>} 
				</div>

				<div className={classnames("form-group", { 'has-error': errors.email})}>
					<label className="control-label">Email</label>
					<input 
						onChange={this.onChange}
						value={this.state.email} 
						type="text" 
						name="email" 
						className="form-control"
					/>
					{errors.email && <span className="help-block">{errors.email}</span>} 
				</div>

				<div className={classnames("form-group", { 'has-error': errors.password})}>
					<label className="control-label">Password</label>
					<input 
						onChange={this.onChange}
						value={this.state.password} 
						type="password" 
						name="password" 
						className="form-control"
					/>
					{errors.password && <span className="help-block">{errors.password}</span>} 
				</div>

				<div className={classnames("form-group", { 'has-error': errors.passwordConfirmation})}>
					<label className="control-label">Password Confirmation</label>
					<input 
						onChange={this.onChange}
						value={this.state.passwordConfirmation} 
						type="password" 
						name="passwordConfirmation" 
						className="form-control"
					/>
					{errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>} 
				</div>

				<div className={classnames("form-group", { 'has-error': errors.timezone})}>
					<label className="control-label">Timezone</label>
					<select 
						name="timezone"
						className="form-control"
						onChange={this.onChange}
						value={this.state.timezone}
						>
						<option value="" disabled>Choose your Timezone</option>
						{options}
					</select>
					{errors.timezone && <span className="help-block">{errors.timezone}</span>} 
				</div>

				<div className="form-group">
					<button disabled={isLoading} className="btn btn-primary btn-lg">
						Sign up
					</button>
				</div>

			</form>
		);
	}
}

export  default SignupForm;