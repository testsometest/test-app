import React, { Component } from "react";
import api from "../api";

class ProceedConfirmation extends Component {
	componentDidMount() {
		console.log("confirmationToken", this.props.match.params.confirmationToken);
		api
			.confirmation(this.props.match.params.confirmationToken)
			.then(
				({ data }) =>
					data.isConfirmed ? this.redirect("/login") : this.redirect("/")
			)
			.catch(err => console.log(err));
	}

	redirect = url => this.props.history.push(url);

	render() {
		return <div>Proceed confirmation...</div>;
	}
}

export default ProceedConfirmation;
