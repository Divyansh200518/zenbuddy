import "../component.css";
import React from "react";

const Input = ({ type, placeholder, style }) => {
	return (
		<input
			className="option-input"
			placeholder={placeholder}
			type={type ? type : "text"}
			style={style}
		/>
	);
};

export default Input;
