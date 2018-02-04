import React, { Component } from "react";
import TextSection from "./TextSection";
import { mainContainer, button } from "../styles/styles";
import api from "../api";

class ForgetPassword extends Component {
	state = {
		payload: {
			email: ""
		},
		errors: {}
	};

	handleChange = e => {
		const { payload, errors } = this.state;

		this.setState({
			payload: { ...payload, [e.target.name]: e.target.value },
			errors: {}
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { payload, errors } = this.state;
		console.log("forgetPassword", payload);
		
		api
			.forgetPassword(payload)
			.then(
				({ data }) =>
					data.forgetPassword && this.props.history.push("/action-confirmation")
			)
			.catch(err => {
				console.log(err.response);
				this.setState({ errors: err.response.data });
			});
	};

	render() {
		const { payload, errors } = this.state;

		return (
			<div style={mainContainer}>
				<h1>Forget password</h1>
				{errors && <span style={{ color: "#ff0600" }}>{errors.message}</span>}
				<form onSubmit={this.handleSubmit}>
					<TextSection
						onChange={this.handleChange}
						value={payload.email}
						field="email"
						labelText="Email"
					/>
					<input
						style={{ marginTop: "28px", display: "inline-block" }}
						type="submit"
						value="Submit"
					/>
				</form>
			</div>
		);
	}
}

export default ForgetPassword;
