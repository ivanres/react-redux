import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessages';
import {
  Redirect
} from 'react-router-dom'


export default function (ComposedComponent) {
	class Authenticate extends React.Component {

	  render() {
		if (!this.props.isAuthenticated){
			this.props.addFlashMessage({
				type: 'error',
				text: 'You need to login to access this page'
			})
			return <Redirect to='/login' />
		}


	    return (
	      <ComposedComponent {...this.props} />
	    );
	  }
	}

	Authenticate.propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		addFlashMessage: PropTypes.func.isRequired
	}

	function mapStateToProps(state) {
		return {
			isAuthenticated: state.auth.isAuthenticated
		}
	}

	return connect(mapStateToProps, { addFlashMessage })(Authenticate);
};