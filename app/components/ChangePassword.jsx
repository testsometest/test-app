import React, { Component } from "react";
import { mainContainer, button } from "../styles/styles";
import TextSection from "./TextSection";
import api from "../api";

class ChangePassword extends Component {
	state = {
		payload: {
			currentPassword: "",
			newPassword: ""
		},
		errors: {}
	};

	handleChange = e => {
		const { payload, errors } = this.state;
		if (errors[e.target.name]) {
			this.setState({ errors: { ...errors, [e.target.name]: null } });
		}
		this.setState({
			payload: { ...payload, [e.target.name]: e.target.value },
			errors: { ...errors, [e.target.name]: "" }
		});
	};

	handleBlur = e => {
		const { name, value } = e.target;
		const { errors } = this.state;
		const { currentPassword, password } = this.state.payload;
		//console.log(value);
		//console.log(value.length);
		if (value.length > 0 && name === "currentPassword") {
			console.log("currentPassword", currentPassword);
			api
				.checkPassword({ payload: { password: currentPassword } })
				.then(response => console.log(response.data))
				.catch(err =>
					this.setState({
						errors: { ...errors, currentPassword: err.response.data.message }
					})
				);
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		const { payload, errors } = this.state;
		console.log("changePassword", payload);

		api
			.changePassword(payload)
			.then(
				({ data }) =>
					data.passwordHasBeenChanged &&
					this.props.history.push("/action-confirmation")
			)
			.catch(err => this.setState({ errors: err.response.data }));
	};

	render() {
		const { payload, errors } = this.state;

		return (
			<div style={mainContainer}>
				<h1>Change password</h1>
				{errors && <span style={{ color: "#ff0600" }}>{errors.message}</span>}
				<form onSubmit={this.handleSubmit}>
					<TextSection
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						value={payload.currentPassword}
						field="currentPassword"
						labelText="Current password"
						error={errors.currentPassword}
						type="password"
					/>
					<TextSection
						onChange={this.handleChange}
						value={payload.newPassword}
						field="newPassword"
						labelText="New password"
						error={errors.newPassword}
						type="password"
					/>
					<input
						style={{ marginTop: "28px", display: "inline-block" }}
						type="submit"
						value="Save changes"
					/>
				</form>
			</div>
		);
	}
}

export default ChangePassword;
