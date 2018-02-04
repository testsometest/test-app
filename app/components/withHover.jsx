import React, { Component } from "react";

const withHover = NewComponent => {
	return class Enhancer extends Component {
		state = {
			hover: false,
			clicked: false
		};

		handleMouseEnter = () => this.setState({ hover: true });

		handleMouseLeave = () => this.setState({ hover: false });

		handleClick = () => this.setState({ clicked: true });

		render() {
			const newProps = {
				handleMouseEnter: this.handleMouseEnter,
				handleMouseLeave: this.handleMouseLeave,
				handleClick: this.handleClick,
				hover: this.state.hover,
				clicked: this.state.clicked
			};

			return <NewComponent {...this.props} {...newProps} />;
		}
	};
};

export default withHover;
