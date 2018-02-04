import React, { Component } from "react";
import TextSection from "./TextSection";
import { mainContainer, button } from "../styles/styles";
import api from "../api";

class NewPassword extends Component {
	state = {
		payload: {
			newPassword: "",
			userId: this.props.match.params.userId
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
		console.log("setNewPassword", payload);
		
		api
			.setNewPassword(payload)
			.then(
				({ data }) => data.setNewPassword && this.props.history.push("/login")
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
				<h1>Set new password</h1>
				{errors.message && (
					<span style={{ color: "#ff0600" }}>{errors.message}</span>
				)}
				<form onSubmit={this.handleSubmit}>
					<TextSection
						onChange={this.handleChange}
						value={payload.email}
						field="newPassword"
						labelText="New password"
						error={errors.password}
						type='password'
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

export default NewPassword;
