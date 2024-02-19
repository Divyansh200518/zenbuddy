import React, { createContext, useState, useContext } from "react";
import "../component.css";
import Button from "./Button";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);

	const alertMessage = (message, duration = 3000, color = "white") => {
		const id = Math.random().toString(36).substr(2, 9); // Generate unique ID
		setNotifications((prevNotifications) => [
			...prevNotifications,
			{
				id,
				message,
				duration,
				color,
				shown: false,
				time: new Date().getTime(),
			},
		]);

		setTimeout(() => {
			hideNotification(id);
		}, duration - 500);
		setTimeout(() => {
			removeNotification(id);
		}, duration + 300);
	};

	const hideNotification = (id) => {
		setNotifications((prevNotifications) =>
			prevNotifications.filter((notification) =>
				notification.id !== id
					? { ...notification, shown: true }
					: notification
			)
		);
	};
	const removeNotification = (id) => {
		setNotifications((prevNotifications) =>
			prevNotifications.filter((notification) => notification.id !== id)
		);
	};

	const explicitlyRemoveNotification = (id) => {
		removeNotification(id);
		// setTimeout(() => {
		// 	removeNotification(id);
		// }, 300);
	};
	return (
		<NotificationContext.Provider
			value={{ alertMessage, explicitlyRemoveNotification }}>
			{children}
			<div className="alertContainer">
				<div className="alertInnerContainer">
					{notifications.map((notification) => (
						<Notification
							key={notification.id}
							notification={notification}
						/>
					))}
				</div>
			</div>
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	return useContext(NotificationContext);
};

const Notification = ({ notification }) => {
	const { explicitlyRemoveNotification } = useNotification();
	return (
		<div
			style={
				notification.shown
					? {
							transform: "translateX(100%)",
							animation: `alertmessage 0.3s ease, rightToLeft 0.2s linear, leftToRight 1s ${
								notification.duration - 300
							} .3s ease-in-out`,
							borderLeft: `3px solid ${notification.color}`,
					  }
					: {
							transform: "translateX(0%)",
							animation: `alertmessage 0.3s ease, rightToLeft 0.2s linear, leftToRight 1s ${
								notification.duration - 300
							}ms ease-in-out`,
							borderLeft: `3px solid ${notification.color}`,
					  }
			}
			className={`alertMessage`}>
			<div
				className="alertMessageTimerVisual"
				style={{
					backgroundColor: notification.color,
					animation: `alertTimeEnder ${notification.duration}ms linear`,
				}}></div>
			<div className="alertMessageText">{notification.message}</div>
			<Button
				className="alertMessageRemoveButton"
				type={"ghost"}
				onClick={() => explicitlyRemoveNotification(notification.id)}>
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 64 64"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M8.4636 8.4636C9.86298 7.06422 12.1318 7.06422 13.5312 8.4636L32.4974 27.4298L51.4636 8.4636C52.863 7.06422 55.1318 7.06422 56.5312 8.4636C57.9306 9.86298 57.9306 12.1318 56.5312 13.5312L37.565 32.4974L56.5312 51.4636C57.9306 52.863 57.9306 55.1318 56.5312 56.5312C55.1318 57.9306 52.863 57.9306 51.4636 56.5312L32.4974 37.565L13.5312 56.5312C12.1318 57.9306 9.86298 57.9306 8.4636 56.5312C7.06422 55.1318 7.06422 52.863 8.4636 51.4636L27.4298 32.4974L8.4636 13.5312C7.06422 12.1318 7.06422 9.86298 8.4636 8.4636Z"
						fill="white"
					/>
				</svg>
			</Button>
		</div>
	);
};
