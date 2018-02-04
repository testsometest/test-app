import React from "react";

const InlineError = ({ text }) => (
	<span
		style={{
			color: "#ff0600",
			display: "block",
			textAlign: "left",
			fontSize: "14px",
			fontWeight: "500",
			letterSpacing: ".05em",
			marginTop: "3px"
		}}
	>
		{text}
	</span>
);

export default InlineError;
