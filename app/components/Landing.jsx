import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	mainContainer,
	buttonContainer,
	landingButton
} from "../styles/styles";
import Actions from "./Actions";
import Message from "./Message";
import withHover from "./withHover";
import { isAuthenticated } from "../utils/authService";

const Landing = props => (
	<div style={mainContainer}>
		<Actions />
		{props.clicked &&
			isAuthenticated() && (
				<Message text={<Link to="change-password">Change password</Link>} />
			)}
		{!props.clicked &&
			isAuthenticated() && <Message text="Now you can click me" />}
		{props.hover &&
			!isAuthenticated() && (
				<Message text="To click me you must be logged in" />
			)}
		<div style={buttonContainer}>
			<a
				style={landingButton}
				onClick={props.handleClick}
				onMouseEnter={props.handleMouseEnter}
				onMouseLeave={props.handleMouseLeave}
			>
				Click Me
			</a>
		</div>
	</div>
);

export default withHover(Landing);
