import React from "react";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import { actionLinkContainer } from "../styles/styles";
import { isAuthenticated, getToken, logout } from "../utils/authService";

const Actions = () => (
	<div>
		{!isAuthenticated() && (
			<div style={actionLinkContainer}>
				<Link to="/signup">Signup</Link>
			</div>
		)}
		<div style={actionLinkContainer}>
			{isAuthenticated() ? (
				<div>
					<span>{`Hi ${decode(getToken()).username}`}</span>
					<div>
						<Link to="/" onClick={() => logout()}>
							Logout
						</Link>
					</div>
				</div>
			) : (
				<Link to="/login">Login</Link>
			)}
		</div>
	</div>
);

export default Actions;
