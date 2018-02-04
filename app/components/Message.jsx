import React from "react";
import { Link } from "react-router-dom";

const Message = ({ text }) => (
	<div style={{ position: "absolute", top: "290px", left: "0", right: "0" }}>
		<span>{text}</span>
	</div>
);

export default Message;
