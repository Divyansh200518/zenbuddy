import { useRef } from "react";
import { useState, useEffect } from "react";

const AlertContainer = () => {
	const [message, setMessage] = useState([]);
	const alertMessage = useRef([]);
	const alertMessageContainer = useRef();

	var interval;

	var alertInterval;

	useEffect(() => {
		if (message.length == 0) {
			clearInterval(alertInterval);
		}

		alertInterval = setInterval(() => {
			if (message.length > 0) {
				setMessage((prevMessages) =>
					prevMessages.map((msg, index) =>
						new Date().getTime() - msg.time > 3000
							? { ...msg, shown: true }
							: msg
					)
				);
				setMessage((prevMessages) =>
					prevMessages.map((msg, index) =>
						new Date().getTime() - msg.time > 3500
							? { ...msg, remove: true }
							: msg
					)
				);
			}
		}, 300);

		return () => {
			clearInterval(alertInterval);
		};
	}, [message]);

	return (
		<div className="alertContainer">
			<div className="alertInnerContainer" ref={alertMessageContainer}>
				{message.map((msg, index) =>
					msg.remove ? null : (
						<div
							key={index}
							style={
								msg.shown
									? { transform: "translateX(100%)" }
									: { transform: "translateX(0%)" }
							}
							ref={(element) =>
								(alertMessage.current[index] = element)
							}
							className={`alertMessage ${index}`}>
							{msg.message + " " + index}
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default AlertContainer;
