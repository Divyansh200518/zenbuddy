import React from "react";
import "../component.css";

const Button = ({
	children,
	type,
	onClick,
	className = "",
	style,
	buttonType,
}) => {
	const buttonVariants = {
		normal: "option-button option-button-normal",
		warning: "option-button option-button-warning",
		ghost: "option-button option-button-ghost",
		outline: "option-button option-button-outline",
		blocked: "option-button option-button-blocked",
		fill: "option-button option-button-fill",
		hide: "option-button option-button-hide",
	};

	return (
		<button
			type={buttonType || "button"}
			onClick={onClick}
			className={
				type
					? className + " " + buttonVariants[type]
					: className || "" + " " + buttonVariants["normal"]
			}
			style={style}>
			{type === "blocked" ? <div className="loader"></div> : children}
		</button>
	);
};

export default Button;
