import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextSection from "./TextSection";
import { mainContainer, button } from "../styles/styles";
import { finishAuthentication } from "../utils/authService";
import decode from "jwt-decode";
import api from "../api";

class Login extends Component {
	state = {
		payload: {
			email: "",
			password: ""
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

	processLogin = token => {
		finishAuthentication(token);
		const decoded = decode(token);
		console.log("token login", token);
		this.props.history.push("/");
	};

	handleSubmit = e => {
		e.preventDefault();
		const { payload, errors } = this.state;
		console.log("signup", payload);
		
		api
			.login(payload)
			.then(({ data }) => this.processLogin(data.token))
			.catch(err => this.setState({ errors: err.response.data }));
	};

	render() {
		const { payload, errors } = this.state;

		return (
			<div style={mainContainer}>
				<h1>Login</h1>
				{errors && <span style={{ color: "#ff0600" }}>{errors.message}</span>}
				<form onSubmit={this.handleSubmit}>
					<TextSection
						onChange={this.handleChange}
						value={payload.email}
						field="email"
						labelText="Email"
					/>
					<TextSection
						onChange={this.handleChange}
						value={payload.password}
						field="password"
						labelText="Password"
						type='password'
					/>
					<input
						style={{ marginTop: "28px", display: "inline-block" }}
						type="submit"
						value="Login"
					/>
				</form>
				<Link style={{ lineHeight: "46px" }} to="forget-password">
					Forgot password?
				</Link>
			</div>
		);
	}
}

export default Login;
