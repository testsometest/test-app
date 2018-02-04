import React, { Component } from "react";
import TextSection from "./TextSection";
import { mainContainer, button } from "../styles/styles";
import api from "../api";

class Signup extends Component {
	state = {
		payload: {
			email: "",
			nickname: "",
			password: ""
		},
		errors: {}
	};

	handleChange = e => {
		const { payload, errors } = this.state;
		if (errors[e.target.name]) {
			this.setState({ errors: { ...errors, [e.target.name]: null } });
		}
		this.setState({
			payload: { ...payload, [e.target.name]: e.target.value }
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { payload, errors } = this.state;
		if (errors.length > 0) return;
		console.log("signup", payload);
		
		api
			.signup(payload)
			.then(
				({ data }) =>
					data.signedUp && this.props.history.push("/action-confirmation")
			)
			.catch(err => this.setState({ errors: err.response.data }));
	};

	render() {
		const { payload, errors } = this.state;

		return (
			<div style={mainContainer}>
				<h1>Signup</h1>
				<form onSubmit={this.handleSubmit}>
					<TextSection
						onChange={this.handleChange}
						value={payload.email}
						field="email"
						labelText="Email"
						error={errors.email}
						type='text'
					/>
					<TextSection
						onChange={this.handleChange}
						value={payload.nickname}
						field="nickname"
						labelText="Nickname"
						error={errors.nickname}
						type='text'
					/>
					<TextSection
						onChange={this.handleChange}
						value={payload.password}
						field="password"
						labelText="Password"
						error={errors.password}
						type='password'
					/>
					<input
						style={{ marginTop: "28px", display: "inline-block" }}
						type="submit"
						value="Signup"
					/>
				</form>
			</div>
		);
	}
}

export default Signup;
