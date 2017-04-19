import React from 'react';
import timezones from '../../data/timezones';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

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

				<TextFieldGroup
					error={errors.username}
					label="Username"
					onChange={this.onChange}
					value={this.state.username}
					field="username"
				/>

				<TextFieldGroup
					error={errors.email}
					label="Email"
					onChange={this.onChange}
					value={this.state.email}
					field="email"
				/>

				<TextFieldGroup
					error={errors.password}
					label="Password"
					onChange={this.onChange}
					value={this.state.password}
					field="password"
				/>

				<TextFieldGroup
					error={errors.passwordConfirmation}
					label="Password Confirmation"
					onChange={this.onChange}
					value={this.state.passwordConfirmation}
					field="passwordConfirmation"
				/>

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