import React from 'react';

class SignupForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			timezone: ''
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit(e){
		e.preventDefault();
		console.log(this.state);
	}

	render(){
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Join our community!</h1>

				<div className="form-group">
					<label className="control-label">Username</label>
					<input type="text" 
						value={this.state.username} 
						onChange={this.onChange}
						name="username" 
						className="form-control"/>
				</div>

				<div className="form-group">
					<label className="control-label">Email</label>
					<input 
						onChange={this.onChange}
						value={this.state.email} 
						type="text" 
						name="email" 
						className="form-control"/>
				</div>

				<div className="form-group">
					<label className="control-label">Password</label>
					<input 
						onChange={this.onChange}
						value={this.state.password} 
						type="password" 
						name="password" 
						className="form-control"/>
				</div>

				<div className="form-group">
					<label className="control-label">Password Confirmation</label>
					<input 
						onChange={this.onChange}
						value={this.state.passwordConfirmation} 
						type="password" 
						name="passwordConfirmation" 
						className="form-control"/>
				</div>

				<div className="form-group">
					<button className="btn btn-primary btn-lg">
						Sign up
					</button>
				</div>

			</form>
		);
	}
}

export  default SignupForm;