import React from "react";
import { textSectionContainer, label, input } from "../styles/styles";
import InlineError from "./InlineError";

const TextSection = ({
	onChange,
	onBlur,
	value,
	field,
	labelText,
	error,
	type
}) => (
	<div style={textSectionContainer}>
		<label style={label}>{labelText}</label>
		<input
			onChange={onChange}
			onBlur={onBlur}
			value={value}
			name={field}
			style={input}
			type={type}
		/>
		{error && <InlineError text={error} />}
	</div>
);

export default TextSection;
