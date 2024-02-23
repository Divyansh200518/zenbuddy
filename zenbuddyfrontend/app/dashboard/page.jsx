"use client";
import { useEffect, useState, useRef, useLayoutEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	signin,
	signup,
	logout,
	checkAuthentication,
	updateUser,
} from "../utils/helper";
import Button from "../../components/ui/Button";
import VideoCall from "../../components/ui/VideoCall";
import ChatPage from "../../components/ui/ChatPage";
import AiChat from "../../components/ui/AiChat";
import Quiz from "../../components/ui/Quiz";
import Meditate from "../../components/ui/Meditate";
import Todo from "../../components/ui/Todo";
import Navbar from "../../components/ui/Db-Navbar";
import "./dashboard.css";
import { useNotification } from "../../components/ui/NotificationProvider.jsx";
import io from "socket.io-client";

const Dashboard = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [userData, setUserData] = useState({});
	const { alertMessage } = useNotification();
	const [socket, setSocket] = useState(null);
	const peerConnection = useRef(null);
	// const [peerConnection, setPeerConnection] = useState(
	// 	new RTCPeerConnection()
	// );
	// var currentScreen = "";
	const [currentScreen, setCurrentScreen] = useState("");
	const [activateCall, setActivateCall] = useState(false);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

	const [chat, setChat] = useState({
		// "divyansh200518@gmail.com": [
		// 	{
		// 		msg: "Hello",
		// 		email: "om200518@gmail.com",
		// 		uid: "gheCZOOYjEenSX5WrruCrwwG7jg1",
		// 		displayName: "Divyansh Vijay",
		// 		email: "om200518@gmail.com",
		// 	},
		// 	{
		// 		msg: "Hello",
		// 		email: "om200518@gmail.com",
		// 		uid: "gheCZOOYjEenSX5WrruCrwwG7jg1",
		// 		displayName: "Divyansh Vijay",
		// 		email: "om200518@gmail.com",
		// 	},
		// 	{
		// 		msg: "bye",
		// 		email: "om200518@gmail.com",
		// 		uid: "gheCZOOYjEenSX5WrruCrwwG7jg121",
		// 		displayName: "Divyansh Vijay",
		// 		email: "om200518@gmail.com",
		// 	},
		// 	{
		// 		msg: "Hello",
		// 		email: "om200518@gmail.com",
		// 		uid: "gheCZOOYjEenSX5WrruCrwwG7jg1",
		// 		displayName: "Divyansh Vijay",
		// 		email: "om200518@gmail.com",
		// 	},
		// 	{
		// 		msg: "Hello",
		// 		email: "om200518@gmail.com",
		// 		uid: "gheCZOOYjEenSX5WrruCrwwG7jg11	",
		// 		displayName: "Divyansh Vijay",
		// 		email: "om200518@gmail.com",
		// 	},
		// ],
	});

	const [currentChat, setCurrentChat] = useState({
		// email: "divyansh200518@gmail.com",
		// photoUrl: "",
		// status: "offline",
		// displayName: "Divyansh Vijay",
	});

	const [friends, setFriends] = useState([]);

	//
	//
	//

	const [initiateCall, setInitiateCall] = useState(0);
	const [isVideo, setIsVideo] = useState(true);
	const [isVoice, setIsVoice] = useState(true);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [connectedUser, setConnectedUser] = useState();
	const [localStream, setLocalStream] = useState(null);
	const [isSocket, setIsSocket] = useState(false);
	const [remoteStream, setRemoteStream] = useState(null);

	const updateChat = (email, newMessage) => {
		if (Object.keys) {
		}
		setChat((prevChat) => ({
			...prevChat,
			[email]: [
				...(prevChat.hasOwnProperty(email) ? prevChat[email] : []),
				newMessage,
			],
		}));
	};

	useEffect(() => {
		const retrieveUserData = async () => {
			const res = await checkLoggedIn();
			setUserData(res.userData);
			setCurrentScreen(searchParams.get("s"));
		};

		retrieveUserData();
	}, []);

	useEffect(() => {
		isUserLoggedIn ? setCurrentScreen(searchParams.get("s")) : null;
	}, [searchParams, isUserLoggedIn]);

	useEffect(() => {
		if (isUserLoggedIn) {
			setSocket(
				io(
					`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`
				)
			);
		} else {
			if (socket) {
				console.log("Disconnecting socket...");
				socket.disconnect();
			}
		}

		return () => {
			if (socket) {
				console.log("Disconnecting socket...");
				socket.disconnect();
			}
		};
	}, [isUserLoggedIn]);

	useEffect(() => {
		console.log(socket);
		if (socket) {
			socket.on("usersonline", ({ users }) => {
				setOnlineUsers(() => users);
			});
			socket.on("prevChat", ({ chat }) => {
				setChat(chat);
			});
			socket.on("connect", () => {
				socket.emit("initial", {
					email: userData.email,
					socketId: socket.id,
				});
			});
			socket.on("chatMessage", ({ sender, receiver, data }) => {
				var appropriateEmail = "";
				if (userData.email != sender.email) {
					appropriateEmail = sender.email;
				} else {
					appropriateEmail = receiver.email;
				}
				updateChat(appropriateEmail, data);
			});
			socket.on("ai", ({ data }) => {
				console.log({ data });
				updateChat("ai", data);
			});
			socket.on("incomingCall", ({ callerId, offer }) => {
				console.log("incoming call from", callerId);
				if (callerId) {
					peerConnection.current
						.setRemoteDescription(offer)
						.then(() => {
							return peerConnection.current.createAnswer();
						})
						.then(async (answer) => {
							peerConnection.current
								.setLocalDescription(answer)
								.then(async () => {
									await socket.emit("answer", {
										id: callerId,
										answer: answer,
									});
									alertMessage(
										"Connection established successfully!"
									);
								})
								.catch((error) => {
									console.error(
										"Error setting local description:",
										error
									);
								});
						});
					setConnectedUser(callerId);
				}
			});

			socket.on("friends", ({ friends }) => {
				setFriends(friends);
				console.log(friends);
			});

			socket.on("answer", ({ id, answer }) => {
				peerConnection.current
					.setRemoteDescription(answer)
					.then(() => {
						console.log({ peerConnection });
						alertMessage("Connection established successfully!");
					})
					.catch((error) => {
						console.error(
							"Error setting remote description:",
							error
						);
					});
			});
		}
		return () => {
			if (socket) {
				socket.offAny();
			}
		};
	}, [socket]);

	async function checkLoggedIn() {
		var sessionCookie = localStorage.getItem("sessionCookie") || "";
		if (!sessionCookie) return false;
		var response = await checkAuthentication(sessionCookie);
		if (!response.status) {
			alertMessage("Not Logged In", 3000, "Orange");
			router.push("/login");
		}

		setIsUserLoggedIn(response.status);
		return response;
	}

	const handleCallUser = () => {
		setInitiateCall((prev) => prev + 1);
	};

	useEffect(() => {
		if (isUserLoggedIn) {
			if (currentScreen === "meet") {
				peerConnection.current = new RTCPeerConnection();
				peerConnection.current.addEventListener(
					"track",
					async (event) => {
						console.log({ event });
						console.log(
							peerConnection.current.connectionState ===
								"connected",
							peerConnection.current.connectionState,
							"connected"
						);
						const [remoteStream] = event.streams;
						setRemoteStream(remoteStream);
					}
				);
				navigator.mediaDevices
					.getUserMedia({ video: isVideo, audio: isVoice })
					.then((stream) => {
						// setLocalStream(stream);
						console.log({ stream });
						// localVideoRef.current.srcObject = stream;
						setLocalStream(stream);
						// remoteVideoRef.srcObject = stream;
						stream
							.getTracks()
							.forEach((track) =>
								peerConnection.current.addTrack(track, stream)
							);
					})
					.catch((error) =>
						alertMessage("Error accessing media devices:", error)
					);
			}
		}
	}, [
		isVideo,
		isVoice,
		peerConnection,
		activateCall,
		currentScreen,
		isUserLoggedIn,
	]);

	useEffect(() => {
		if (socket) {
		}
	}, [userData, socket, isUserLoggedIn]);

	useEffect(() => {
		const callUser = async (userId) => {
			peerConnection.current.createOffer().then(async (offer) => {
				await peerConnection.current.setLocalDescription(offer);
				await socket.emit("callUser", {
					userId: userId,
					offer: offer,
				});
			});
		};

		return async () => {
			if (initiateCall) {
				let users = onlineUsers;
				let index = users.indexOf(socket.id);
				if (index !== -1) {
					users.splice(index, 1);
				}
				await callUser(users[0]);
			}
		};
	}, [onlineUsers, initiateCall, peerConnection]);

	const handleFootstepData = async () => {
		try {
			const accessToken = localStorage.getItem("accessToken");
			if (!accessToken) {
				console.error("Access token not found in localStorage.");
				return;
			}

			// Specify the data types to aggregate (e.g., step count)
			const dataTypeNames = ["com.google.step_count.delta"];

			// Specify the time range for aggregation (e.g., one week)
			const startTimeMillis =
				new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000; // 7 days ago
			const endTimeMillis = new Date().setHours(23, 59, 59, 999);

			// Specify the aggregation type (e.g., sum)
			// const aggregationType = "com.google.aggregate.sum";
			const aggregationType = "com.google.aggregate.count";

			const requestBody = {
				aggregateBy: [
					{
						dataTypeName: dataTypeNames[0],
						dataSourceId:
							"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
					},
				],
				bucketByTime: { durationMillis: 86400000 }, // Aggregate data into daily buckets
				startTimeMillis: startTimeMillis,
				endTimeMillis: endTimeMillis,
				aggregateType: aggregationType,
			};

			const res = await fetch(
				"https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestBody),
				}
			);

			if (!res.ok) {
				throw new Error(`Failed to fetch data: ${res.statusText}`);
			}

			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.error("Error fetching aggregate data:", error);
		}
	};

	return (
		<>
			{isUserLoggedIn ? (
				<div className="main-page-wrapper">
					{currentScreen !== "quiz" &&
					currentScreen !== "meditate" ? (
						<Navbar userDetail={userData}></Navbar>
					) : null}

					<div
						className="main-page-inner-wrapper"
						style={
							// currentScreen !== "quiz"
							currentScreen !== "quiz" &&
							currentScreen !== "meditate"
								? { height: "88%", width: "90%" }
								: { height: "100%", width: "100%" }
						}>
						{currentScreen === null ? (
							<div className="dashboard">
								<div className="dashboard-user-element-container">
									<div className="dashboard-user-element-row1">
										<div className="dashboard-user-element-row1-inner-container">
											<div className="dashboard-user-profile-board">
												<div className="dashboard-user-profile-calender">
													<svg
														width="42"
														height="42"
														viewBox="0 0 42 42"
														fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<path
															d="M36.553 0H5.22185C2.3379 0 0 2.33157 0 5.2077V36.4539C0 39.33 2.3379 41.6616 5.22185 41.6616H36.553C39.4369 41.6616 41.7748 39.33 41.7748 36.4539V5.2077C41.7748 2.33157 39.4369 0 36.553 0ZM2.61093 10.0434C2.61093 8.81079 3.77988 7.81155 5.22185 7.81155H36.553C37.9949 7.81155 39.1639 8.81079 39.1639 10.0434V36.8259C39.1639 38.0585 37.9949 39.0577 36.553 39.0577H5.22185C3.77988 39.0577 2.61093 38.0585 2.61093 36.8259V10.0434Z"
															fill="white"
														/>
														<path
															d="M16.9671 18.2233C18.4091 18.2233 19.5781 17.0575 19.5781 15.6195C19.5781 14.1814 18.4091 13.0156 16.9671 13.0156C15.5252 13.0156 14.3562 14.1814 14.3562 15.6195C14.3562 17.0575 15.5252 18.2233 16.9671 18.2233Z"
															fill="white"
														/>
														<path
															d="M24.7999 18.2233C26.2419 18.2233 27.4108 17.0575 27.4108 15.6195C27.4108 14.1814 26.2419 13.0156 24.7999 13.0156C23.3579 13.0156 22.189 14.1814 22.189 15.6195C22.189 17.0575 23.3579 18.2233 24.7999 18.2233Z"
															fill="white"
														/>
														<path
															d="M32.6327 18.2233C34.0747 18.2233 35.2436 17.0575 35.2436 15.6195C35.2436 14.1814 34.0747 13.0156 32.6327 13.0156C31.1907 13.0156 30.0218 14.1814 30.0218 15.6195C30.0218 17.0575 31.1907 18.2233 32.6327 18.2233Z"
															fill="white"
														/>
														<path
															d="M9.13436 26.0349C10.5763 26.0349 11.7453 24.8691 11.7453 23.431C11.7453 21.993 10.5763 20.8272 9.13436 20.8272C7.69239 20.8272 6.52344 21.993 6.52344 23.431C6.52344 24.8691 7.69239 26.0349 9.13436 26.0349Z"
															fill="white"
														/>
														<path
															d="M16.9671 26.0349C18.4091 26.0349 19.5781 24.8691 19.5781 23.431C19.5781 21.993 18.4091 20.8272 16.9671 20.8272C15.5252 20.8272 14.3562 21.993 14.3562 23.431C14.3562 24.8691 15.5252 26.0349 16.9671 26.0349Z"
															fill="white"
														/>
														<path
															d="M24.7999 26.0349C26.2419 26.0349 27.4108 24.8691 27.4108 23.431C27.4108 21.993 26.2419 20.8272 24.7999 20.8272C23.3579 20.8272 22.189 21.993 22.189 23.431C22.189 24.8691 23.3579 26.0349 24.7999 26.0349Z"
															fill="white"
														/>
														<path
															d="M32.6327 26.0349C34.0747 26.0349 35.2436 24.8691 35.2436 23.431C35.2436 21.993 34.0747 20.8272 32.6327 20.8272C31.1907 20.8272 30.0218 21.993 30.0218 23.431C30.0218 24.8691 31.1907 26.0349 32.6327 26.0349Z"
															fill="white"
														/>
														<path
															d="M9.13436 33.8464C10.5763 33.8464 11.7453 32.6806 11.7453 31.2426C11.7453 29.8045 10.5763 28.6387 9.13436 28.6387C7.69239 28.6387 6.52344 29.8045 6.52344 31.2426C6.52344 32.6806 7.69239 33.8464 9.13436 33.8464Z"
															fill="white"
														/>
														<path
															d="M16.9671 33.8464C18.4091 33.8464 19.5781 32.6806 19.5781 31.2426C19.5781 29.8045 18.4091 28.6387 16.9671 28.6387C15.5252 28.6387 14.3562 29.8045 14.3562 31.2426C14.3562 32.6806 15.5252 33.8464 16.9671 33.8464Z"
															fill="white"
														/>
														<path
															d="M24.7999 33.8464C26.2419 33.8464 27.4108 32.6806 27.4108 31.2426C27.4108 29.8045 26.2419 28.6387 24.7999 28.6387C23.3579 28.6387 22.189 29.8045 22.189 31.2426C22.189 32.6806 23.3579 33.8464 24.7999 33.8464Z"
															fill="white"
														/>
													</svg>
													<span className="dashboard-user-profile-calender-date">
														{" "}
														&nbsp; Wed, Jan 31, 2024
													</span>
												</div>
												<div className="dashboard-user-profile">
													<div className="dashboard-user-profile-picture">
														<img
															src={
																userData.photoURL ===
																	"https://api.dicebear.com/7.x/pixel-art/svg" ||
																!userData.photoURL
																	? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userData.uid}`
																	: userData.photoURL
															}
															alt="userphoto"
														/>
													</div>
													<div className="dashboard-user-profile-detail">
														<div className="dashboard-user-profile-name">
															Hi,{" "}
															{userData.displayName ||
																":)"}
														</div>
														<div className="dashboard-user-profile-health-details">
															<div className="dashboard-user-profile-health">
																<svg
																	width="34"
																	height="35"
																	viewBox="0 0 34 35"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M18.5164 0.814695C16.5202 0.317004 14.667 1.82299 14.5321 3.77223C14.3806 5.96279 14.053 7.97122 13.6366 9.1693C13.3766 9.91742 12.6369 11.2773 11.4669 12.5812C10.3016 13.8799 8.78713 15.0366 7.01396 15.5189C5.61151 15.9005 4.17969 17.1124 4.17969 18.8835V27.2179C4.17969 28.9769 5.60489 30.2672 7.20402 30.4363C9.4379 30.6726 10.4706 31.3013 11.5236 31.9423L11.623 32.0028C12.1928 32.3491 12.8308 32.7304 13.6507 33.012C14.4791 33.2964 15.4492 33.4658 16.7121 33.4658H24.0227C25.98 33.4658 27.3625 32.4703 28.0626 31.2485C28.4052 30.6505 28.5918 29.9857 28.5918 29.3485C28.5918 29.0311 28.5443 28.6983 28.4314 28.3809C28.8521 27.8345 29.2269 27.1782 29.4521 26.5044C29.6813 25.8186 29.8104 24.9181 29.4589 24.1125C29.6033 23.8403 29.7114 23.5522 29.7919 23.2714C29.9531 22.7087 30.0279 22.0899 30.0279 21.4881C30.0279 20.8863 29.9531 20.2675 29.7919 19.7047C29.7198 19.4532 29.6256 19.1959 29.5029 18.9494C30.3272 17.7591 30.3769 16.4478 29.9915 15.3388C29.5629 14.1055 28.5686 13.0483 27.4861 12.6884C25.7167 12.1002 23.7192 12.1138 22.2311 12.2487C21.9006 12.2787 21.59 12.3151 21.3061 12.3539C22.2888 8.19224 21.6353 4.65998 21.1749 2.96017C20.888 1.90093 20.0283 1.19165 19.0624 0.950835L18.5164 0.814695ZM24.0227 31.3827H16.7121C15.6454 31.3827 14.9094 31.2411 14.3308 31.0424C13.7438 30.8408 13.2737 30.5666 12.71 30.224L12.6266 30.1733C11.4676 29.4681 10.1234 28.6503 7.42427 28.3648C6.7291 28.2913 6.26843 27.7598 6.26843 27.2179V18.8835C6.26843 18.3537 6.74027 17.7526 7.56365 17.5286C9.85159 16.9062 11.6926 15.4535 13.0234 13.9703C14.3495 12.4924 15.2465 10.898 15.6102 9.85143C16.1169 8.39328 16.46 6.16864 16.6159 3.9156C16.6681 3.16088 17.3694 2.67588 18.0098 2.83555L18.5558 2.97169C18.8913 3.05533 19.0955 3.27112 19.1584 3.50337C19.6187 5.20268 20.3032 9.01268 18.8545 13.3471C18.7339 13.7078 18.82 14.1053 19.079 14.3842C19.3379 14.663 19.7289 14.779 20.0985 14.6869L20.104 14.6856L20.1326 14.6788C20.1592 14.6725 20.2006 14.663 20.2556 14.6509C20.3656 14.6268 20.5294 14.5925 20.7371 14.5542C21.1533 14.4773 21.7408 14.3848 22.4202 14.3232C23.804 14.1977 25.4619 14.2113 26.8256 14.6646C27.1921 14.7864 27.7644 15.2916 28.0179 16.0209C28.2404 16.6612 28.1972 17.4142 27.4617 18.1477L26.7232 18.8842L27.4617 19.6207C27.5506 19.7093 27.6796 19.9143 27.7835 20.277C27.8833 20.6256 27.9391 21.0483 27.9391 21.4881C27.9391 21.9278 27.8833 22.3505 27.7835 22.6991C27.6796 23.0618 27.5506 23.2668 27.4617 23.3554L26.7232 24.0919L27.4617 24.8284C27.56 24.9264 27.6877 25.1959 27.4705 25.8456C27.2665 26.4561 26.8386 27.1015 26.4174 27.5216L25.6789 28.2581L26.4174 28.9945C26.4283 29.0055 26.5031 29.0979 26.5031 29.3484C26.5031 29.59 26.4286 29.9016 26.2491 30.215C25.9048 30.8158 25.1986 31.3827 24.0227 31.3827Z"
																		fill="white"
																	/>
																</svg>
																<div>
																	<span
																		className="dashboard-user-profile-health-score"
																		// style={
																		// 	"font-size: 20px;"
																		// }
																	>
																		&nbsp;
																		80%
																	</span>
																</div>
															</div>
															<div className="dashboard-user-profile-mood">
																<svg
																	width="35"
																	height="34"
																	viewBox="0 0 35 34"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M17.6787 31.2462C9.60362 31.2462 3.05749 24.7178 3.05749 16.6646C3.05749 8.61146 9.60362 2.08308 17.6787 2.08308C25.7537 2.08308 32.2999 8.61146 32.2999 16.6646C32.2999 24.7178 25.7537 31.2462 17.6787 31.2462ZM17.6787 33.3293C26.9073 33.3293 34.3886 25.8683 34.3886 16.6646C34.3886 7.46101 26.9073 0 17.6787 0C8.45004 0 0.96875 7.46101 0.96875 16.6646C0.96875 25.8683 8.45004 33.3293 17.6787 33.3293Z"
																		fill="white"
																	/>
																	<path
																		d="M9.91857 19.9292C10.4178 19.6412 11.0567 19.8113 11.3455 20.3093C12.6111 22.4912 14.9741 23.9554 17.6787 23.9554C20.3834 23.9554 22.7463 22.4912 24.0119 20.3093C24.3008 19.8113 24.9396 19.6412 25.4389 19.9292C25.9382 20.2173 26.1088 20.8544 25.82 21.3523C24.1964 24.1515 21.1591 26.0385 17.6787 26.0385C14.1983 26.0385 11.1611 24.1515 9.5375 21.3523C9.24869 20.8544 9.4193 20.2173 9.91857 19.9292Z"
																		fill="white"
																	/>
																	<path
																		d="M15.5899 13.54C15.5899 15.2657 14.6548 16.6646 13.5012 16.6646C12.3476 16.6646 11.4125 15.2657 11.4125 13.54C11.4125 11.8143 12.3476 10.4154 13.5012 10.4154C14.6548 10.4154 15.5899 11.8143 15.5899 13.54Z"
																		fill="white"
																	/>
																	<path
																		d="M23.9449 13.54C23.9449 15.2657 23.0097 16.6646 21.8562 16.6646C20.7026 16.6646 19.7674 15.2657 19.7674 13.54C19.7674 11.8143 20.7026 10.4154 21.8562 10.4154C23.0097 10.4154 23.9449 11.8143 23.9449 13.54Z"
																		fill="white"
																	/>
																</svg>
																<div>
																	<span
																		className="dashboard-user-profile-health-mood"
																		// style="font-size: 20px;"
																	>
																		&nbsp;
																		Happy
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<Button
												type={"fill"}
												style={{
													width: "100%",
													height: "14%",
													borderRadius: "20px",
												}}>
												Take a Quiz
											</Button>
										</div>

										{/*  */}
										<div className="dasboard-user-health-detail-pattern">
											<div className="dashboard-user-health-detail-container dashboard-user-health-detail-mood-level">
												<div className="dashboard-user-health-detail-heading dashboard-user-health-detail-mood-pic">
													<div className="dashboard-user-health-detail-heading-rectangle dashboard-user-health-detail-mood-level-rectangle">
														<svg
															width="25"
															height="25"
															viewBox="0 0 25 25"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM10.9375 10.1562C10.9375 11.4507 10.2379 12.5 9.37499 12.5C8.51204 12.5 7.81249 11.4507 7.81249 10.1562C7.81249 8.86183 8.51204 7.8125 9.37499 7.8125C10.2379 7.8125 10.9375 8.86183 10.9375 10.1562ZM6.69498 14.9487C7.06846 14.7327 7.54637 14.8603 7.76242 15.2338C8.70917 16.8705 10.4768 17.9688 12.5 17.9688C14.5233 17.9688 16.2909 16.8705 17.2376 15.2338C17.4537 14.8603 17.9316 14.7327 18.3051 14.9487C18.6786 15.1648 18.8062 15.6427 18.5901 16.0162C17.3756 18.1158 15.1036 19.5312 12.5 19.5312C9.89649 19.5312 7.62447 18.1158 6.40991 16.0162C6.19386 15.6427 6.32149 15.1648 6.69498 14.9487ZM15.625 12.5C14.762 12.5 14.0625 11.4507 14.0625 10.1562C14.0625 8.86183 14.762 7.8125 15.625 7.8125C16.4879 7.8125 17.1875 8.86183 17.1875 10.1562C17.1875 11.4507 16.4879 12.5 15.625 12.5Z"
																fill="#58BDBD"
															/>
														</svg>
													</div>
													<div className="dashboard-user-health-detail-heading-word">
														Mood Level
													</div>
												</div>
												<div className="dashboard-user-health-detail-graph-container dashboard-user-health-detail-mood-days-details">
													<div className="dashboard-user-health-detail-mood-days-sunday">
														<svg
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.99999 6.5C6.99999 7.32843 6.55228 8 5.99999 8C5.44771 8 4.99999 7.32843 4.99999 6.5C4.99999 5.67157 5.44771 5 5.99999 5C6.55228 5 6.99999 5.67157 6.99999 6.5ZM4.28478 9.5672C4.52382 9.42893 4.82968 9.51061 4.96795 9.74964C5.57387 10.7971 6.70515 11.5 8.00002 11.5C9.29488 11.5 10.4262 10.7971 11.0321 9.74964C11.1704 9.51061 11.4762 9.42893 11.7153 9.5672C11.9543 9.70547 12.036 10.0113 11.8977 10.2504C11.1204 11.5941 9.66628 12.5 8.00002 12.5C6.33375 12.5 4.87966 11.5941 4.10234 10.2504C3.96407 10.0113 4.04575 9.70547 4.28478 9.5672ZM9.99999 8C9.44771 8 8.99999 7.32843 8.99999 6.5C8.99999 5.67157 9.44771 5 9.99999 5C10.5523 5 11 5.67157 11 6.5C11 7.32843 10.5523 8 9.99999 8Z"
																fill="#58BDBD"
															/>
														</svg>
														<div className="dashboard-user-health-detail-mood-days">
															<h4>S</h4>
														</div>
													</div>
													<div className="dashboard-user-health-detail-mood-days-monday">
														<svg
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.99999 6.5C6.99999 7.32843 6.55228 8 5.99999 8C5.44771 8 4.99999 7.32843 4.99999 6.5C4.99999 5.67157 5.44771 5 5.99999 5C6.55228 5 6.99999 5.67157 6.99999 6.5ZM4.28478 12.4328C4.04575 12.2945 3.96407 11.9887 4.10234 11.7496C4.87966 10.4059 6.33375 9.5 8.00002 9.5C9.66628 9.5 11.1204 10.4059 11.8977 11.7496C12.036 11.9887 11.9543 12.2945 11.7153 12.4328C11.4762 12.5711 11.1704 12.4894 11.0321 12.2504C10.4262 11.2029 9.29488 10.5 8.00002 10.5C6.70515 10.5 5.57387 11.2029 4.96795 12.2504C4.82968 12.4894 4.52382 12.5711 4.28478 12.4328ZM9.99999 8C9.44771 8 8.99999 7.32843 8.99999 6.5C8.99999 5.67157 9.44771 5 9.99999 5C10.5523 5 11 5.67157 11 6.5C11 7.32843 10.5523 8 9.99999 8Z"
																fill="#58BDBD"
															/>
														</svg>
														<div className="dashboard-user-health-detail-mood-days">
															<h4>M</h4>
														</div>
													</div>
													<div className="dashboard-user-health-detail-mood-days-tuesday">
														<svg
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4.05277 4.2764C4.17627 4.02941 4.47661 3.92929 4.72359 4.05279L6.72359 5.05279C6.97058 5.17628 7.0707 5.47662 6.9472 5.72361C6.93086 5.75629 6.91143 5.78639 6.88943 5.81375C6.96009 6.0194 6.99999 6.25271 6.99999 6.5C6.99999 7.32843 6.55227 8 5.99999 8C5.4477 8 4.99999 7.32843 4.99999 6.5C4.99999 6.09192 5.10863 5.7219 5.28489 5.45147L4.27638 4.94722C4.02939 4.82372 3.92928 4.52339 4.05277 4.2764ZM4.28478 12.4328C4.04575 12.2945 3.96407 11.9887 4.10234 11.7496C4.87966 10.4059 6.33375 9.5 8.00002 9.5C9.66628 9.5 11.1204 10.4059 11.8977 11.7496C12.036 11.9887 11.9543 12.2945 11.7152 12.4328C11.4762 12.5711 11.1704 12.4894 11.0321 12.2504C10.4262 11.2029 9.29488 10.5 8.00002 10.5C6.70515 10.5 5.57387 11.2029 4.96795 12.2504C4.82968 12.4894 4.52381 12.5711 4.28478 12.4328ZM9.99999 8C9.4477 8 8.99999 7.32843 8.99999 6.5C8.99999 6.25271 9.03988 6.0194 9.11054 5.81375C9.08855 5.78639 9.06911 5.75629 9.05277 5.72361C8.92928 5.47662 9.02939 5.17628 9.27638 5.05279L11.2764 4.05279C11.5234 3.92929 11.8237 4.02941 11.9472 4.2764C12.0707 4.52339 11.9706 4.82372 11.7236 4.94722L10.7151 5.45147C10.8913 5.7219 11 6.09192 11 6.5C11 7.32843 10.5523 8 9.99999 8Z"
																fill="#58BDBD"
															/>
														</svg>
														<div className="dashboard-user-health-detail-mood-days">
															<h4>T</h4>
														</div>
													</div>
													<div className="dashboard-user-health-detail-mood-days-wednesday">
														<svg
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM7 6.5C7 7.00097 6.83627 6.89604 6.58471 6.73482C6.42027 6.62944 6.2183 6.5 6 6.5C5.7817 6.5 5.57973 6.62944 5.41529 6.73482C5.16373 6.89604 5 7.00097 5 6.5C5 5.67157 5.44772 5 6 5C6.55228 5 7 5.67157 7 6.5ZM12.3311 9.50036C12.5097 9.80997 12.5095 10.1913 12.3305 10.5007C11.4675 11.9926 9.85199 13 8.00003 13C6.14806 13 4.53256 11.9926 3.66955 10.5007C3.49058 10.1913 3.49034 9.80997 3.66892 9.50036C3.8475 9.19076 4.17774 9 4.53516 9H11.4649C11.8223 9 12.1526 9.19076 12.3311 9.50036ZM10.5847 6.73482C10.4203 6.62944 10.2183 6.5 10 6.5C9.7817 6.5 9.57973 6.62944 9.41529 6.73482C9.16373 6.89604 9 7.00097 9 6.5C9 5.67157 9.44772 5 10 5C10.5523 5 11 5.67157 11 6.5C11 7.00097 10.8363 6.89604 10.5847 6.73482Z"
																fill="#58BDBD"
															/>
														</svg>
														<div className="dashboard-user-health-detail-mood-days">
															<h4>W</h4>
														</div>
													</div>
													<div className="dashboard-user-health-detail-mood-days-thrusday">
														<svg
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4.05277 4.2764C4.17627 4.02941 4.47661 3.92929 4.72359 4.05279L6.72359 5.05279C6.97058 5.17628 7.0707 5.47662 6.9472 5.72361C6.93086 5.75629 6.91143 5.78639 6.88943 5.81375C6.96009 6.0194 6.99999 6.25271 6.99999 6.5C6.99999 7.32843 6.55227 8 5.99999 8C5.4477 8 4.99999 7.32843 4.99999 6.5C4.99999 6.09192 5.10863 5.7219 5.28489 5.45147L4.27638 4.94722C4.02939 4.82372 3.92928 4.52339 4.05277 4.2764ZM4.28478 12.4328C4.04575 12.2945 3.96407 11.9887 4.10234 11.7496C4.87966 10.4059 6.33375 9.5 8.00002 9.5C9.66628 9.5 11.1204 10.4059 11.8977 11.7496C12.036 11.9887 11.9543 12.2945 11.7152 12.4328C11.4762 12.5711 11.1704 12.4894 11.0321 12.2504C10.4262 11.2029 9.29488 10.5 8.00002 10.5C6.70515 10.5 5.57387 11.2029 4.96795 12.2504C4.82968 12.4894 4.52381 12.5711 4.28478 12.4328ZM9.99999 8C9.4477 8 8.99999 7.32843 8.99999 6.5C8.99999 6.25271 9.03988 6.0194 9.11054 5.81375C9.08855 5.78639 9.06911 5.75629 9.05277 5.72361C8.92928 5.47662 9.02939 5.17628 9.27638 5.05279L11.2764 4.05279C11.5234 3.92929 11.8237 4.02941 11.9472 4.2764C12.0707 4.52339 11.9706 4.82372 11.7236 4.94722L10.7151 5.45147C10.8913 5.7219 11 6.09192 11 6.5C11 7.32843 10.5523 8 9.99999 8Z"
																fill="#58BDBD"
															/>
														</svg>
														<div className="dashboard-user-health-detail-mood-days">
															<h4>T</h4>
														</div>
													</div>
													<div className="dashboard-user-health-detail-mood-days-friday">
														<svg
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.99999 6.5C6.99999 7.32843 6.55228 8 5.99999 8C5.44771 8 4.99999 7.32843 4.99999 6.5C4.99999 5.67157 5.44771 5 5.99999 5C6.55228 5 6.99999 5.67157 6.99999 6.5ZM4.28478 9.5672C4.52382 9.42893 4.82968 9.51061 4.96795 9.74964C5.57387 10.7971 6.70515 11.5 8.00002 11.5C9.29488 11.5 10.4262 10.7971 11.0321 9.74964C11.1704 9.51061 11.4762 9.42893 11.7153 9.5672C11.9543 9.70547 12.036 10.0113 11.8977 10.2504C11.1204 11.5941 9.66628 12.5 8.00002 12.5C6.33375 12.5 4.87966 11.5941 4.10234 10.2504C3.96407 10.0113 4.04575 9.70547 4.28478 9.5672ZM9.99999 8C9.44771 8 8.99999 7.32843 8.99999 6.5C8.99999 5.67157 9.44771 5 9.99999 5C10.5523 5 11 5.67157 11 6.5C11 7.32843 10.5523 8 9.99999 8Z"
																fill="#58BDBD"
															/>
														</svg>
														<div className="dashboard-user-health-detail-mood-days">
															<h4>F</h4>
														</div>
													</div>
													<div className="dashboard-user-health-detail-mood-days-saturday">
														<svg
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.99999 6.5C6.99999 7.32843 6.55228 8 5.99999 8C5.44771 8 4.99999 7.32843 4.99999 6.5C4.99999 5.67157 5.44771 5 5.99999 5C6.55228 5 6.99999 5.67157 6.99999 6.5ZM4.28478 9.5672C4.52382 9.42893 4.82968 9.51061 4.96795 9.74964C5.57387 10.7971 6.70515 11.5 8.00002 11.5C9.29488 11.5 10.4262 10.7971 11.0321 9.74964C11.1704 9.51061 11.4762 9.42893 11.7153 9.5672C11.9543 9.70547 12.036 10.0113 11.8977 10.2504C11.1204 11.5941 9.66628 12.5 8.00002 12.5C6.33375 12.5 4.87966 11.5941 4.10234 10.2504C3.96407 10.0113 4.04575 9.70547 4.28478 9.5672ZM9.99999 8C9.44771 8 8.99999 7.32843 8.99999 6.5C8.99999 5.67157 9.44771 5 9.99999 5C10.5523 5 11 5.67157 11 6.5C11 7.32843 10.5523 8 9.99999 8Z"
																fill="#58BDBD"
															/>
														</svg>
														<div className="dashboard-user-health-detail-mood-days">
															<h4>S</h4>
														</div>
													</div>
												</div>
											</div>
											<div className="dashboard-user-health-detail-container dashboard-user-health-detail-sleep-pattern">
												<div className="dashboard-user-health-detail-heading dashboard-user-health-detail-sleep-pattern-pic">
													<div className="dashboard-user-health-detail-heading-rectangle dashboard-user-health-detail-sleep-pattern-rectangle">
														<svg
															width="25"
															height="25"
															viewBox="0 0 25 25"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M9.37547 0.43485C9.66016 0.78193 9.75734 1.30502 9.50109 1.7752C8.62516 3.38241 8.12735 5.22347 8.12735 7.18259C8.12735 13.4645 13.2505 18.5511 19.5628 18.5511C20.3852 18.5511 21.1866 18.4649 21.9585 18.3014C22.4863 18.1896 22.9663 18.4282 23.2236 18.7947C23.4891 19.1729 23.5448 19.7372 23.1748 20.1913C20.7865 23.1227 17.1325 25 13.0368 25C5.83347 25 0 19.1974 0 12.0469C0 6.66532 3.30335 2.04995 8.00553 0.0938872C8.54881 -0.132111 9.0817 0.0767081 9.37547 0.43485Z"
																fill="#A3D9A5"
															/>
														</svg>
													</div>
													<div className="dashboard-user-health-detail-heading-word">
														Sleep cycle
													</div>
												</div>
												<div className="dashboard-user-health-detail-graph-container dashboard-user-health-detail-sleep-pattern-status">
													<svg
														width="82"
														height="82"
														viewBox="0 0 82 82"
														fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<circle
															cx="41"
															cy="41"
															r="40"
															fill="#A3D9A5"
															fill-opacity="0.5"
														/>
														<path
															d="M41.687 1.02278C49.597 1.16085 57.2885 3.64143 63.7887 8.15082C70.289 12.6602 75.3061 18.9959 78.2056 26.3566C81.1051 33.7174 81.7567 41.7727 80.0781 49.5038C78.3995 57.2349 74.4661 64.2947 68.7752 69.7903L40.9889 41.0167L41.687 1.02278Z"
															fill="#A3D9A5"
														/>
														<circle
															cx="41"
															cy="41"
															r="30"
															fill="white"
														/>
													</svg>
												</div>
											</div>
											<div className="dashboard-user-health-detail-container dashboard-user-health-detail-pedometer">
												<div className="dashboard-user-health-detail-heading dashboard-user-health-detail-pedometer-pattern-pic">
													<div className="dashboard-user-health-detail-heading-rectangle dashboard-user-health-detail-pedometer-pattern-rectangle">
														<svg
															width="24"
															height="25"
															viewBox="0 0 24 25"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M6.97958 20.6967L1.39282 18.5938L0.681055 20.3187C0.681055 20.3187 0.000172198 23.1099 2.44135 24.029C4.88547 24.9511 6.29282 22.4305 6.29282 22.4305L6.97958 20.6967Z"
																fill="#9F6BAA"
															/>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M11.0647 5.43381C8.64999 4.46469 5.26028 6.58969 4.08823 9.26764C3.60587 10.3706 3.38675 11.5603 3.2044 12.7338C3.11764 13.2941 3.05587 13.8691 2.94558 14.4279C2.8044 15.1294 2.59411 15.8044 2.38528 16.4853C2.09558 17.4309 2.4147 17.5897 3.29558 17.7515L6.38087 18.9162C6.69558 19.0662 7.31028 19.4441 7.62646 19.0912C7.90587 18.775 7.84999 18.1985 8.03675 17.8235C8.27793 17.3368 8.54852 16.8412 8.84705 16.3823C9.50734 15.3559 10.7603 14.6059 11.6088 13.7206C12.6603 12.6206 13.2412 11.5176 13.5618 10.0588C13.9882 8.11616 13.0073 6.21175 11.0647 5.43381Z"
																fill="#9F6BAA"
															/>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M13.673 14.3984L19.048 16.5205C19.048 16.5205 17.9392 20.8631 14.6568 19.5999C11.3745 18.3337 13.673 14.3984 13.673 14.3984Z"
																fill="#9F6BAA"
															/>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M21.3365 1.05767C23.6306 1.91061 24.5541 5.52532 23.5879 8.12679C23.1894 9.19591 22.5541 10.1547 21.9026 11.0886C21.5909 11.5327 21.2526 11.968 20.9571 12.4283C20.5938 13.0018 20.2909 13.6062 19.985 14.2091C19.5571 15.0474 19.2321 14.9518 18.5203 14.5121L15.6306 13.3753C15.3173 13.2812 14.6468 13.1518 14.6644 12.7121C14.6806 12.315 15.0997 11.9474 15.2203 11.5738C15.3762 11.0841 15.5188 10.5665 15.6159 10.0621C15.8394 8.93267 15.4747 7.61943 15.4806 6.47238C15.4806 5.04738 15.8144 3.91355 16.5571 2.70032C17.5526 1.07385 19.4865 0.373847 21.3365 1.05767Z"
																fill="#9F6BAA"
															/>
														</svg>
													</div>
													<div className="dashboard-user-health-detail-heading-word">
														Pedometer
													</div>
												</div>
												<div className="dashboard-user-health-detail-graph-container">
													<div className="dashboard-user-health-detail-pedometer-pattern-status">
														<div
															className="dashboard-user-health-detail-pedometer-pattern-status-bar"
															style={{
																height: "10%",
															}}></div>
														<div className="dashboard-user-health-detail-pedometer-pattern-status-day">
															M
														</div>
													</div>
													<div className="dashboard-user-health-detail-pedometer-pattern-status">
														<div
															className="dashboard-user-health-detail-pedometer-pattern-status-bar"
															style={{
																height: "40%",
															}}></div>
														<div className="dashboard-user-health-detail-pedometer-pattern-status-day">
															T
														</div>
													</div>
													<div className="dashboard-user-health-detail-pedometer-pattern-status">
														<div
															className="dashboard-user-health-detail-pedometer-pattern-status-bar"
															style={{
																height: "30%",
															}}></div>
														<div className="dashboard-user-health-detail-pedometer-pattern-status-day">
															W
														</div>
													</div>
													<div className="dashboard-user-health-detail-pedometer-pattern-status">
														<div
															className="dashboard-user-health-detail-pedometer-pattern-status-bar"
															style={{
																height: "50%",
															}}></div>
														<div className="dashboard-user-health-detail-pedometer-pattern-status-day">
															T
														</div>
													</div>
													<div className="dashboard-user-health-detail-pedometer-pattern-status">
														<div
															className="dashboard-user-health-detail-pedometer-pattern-status-bar"
															style={{
																height: "70%",
															}}></div>
														<div className="dashboard-user-health-detail-pedometer-pattern-status-day">
															F
														</div>
													</div>
													<div className="dashboard-user-health-detail-pedometer-pattern-status">
														<div
															className="dashboard-user-health-detail-pedometer-pattern-status-bar"
															style={{
																height: "100%",
															}}></div>
														<div className="dashboard-user-health-detail-pedometer-pattern-status-day">
															S
														</div>
													</div>
													<div className="dashboard-user-health-detail-pedometer-pattern-status">
														<div
															className="dashboard-user-health-detail-pedometer-pattern-status-bar"
															style={{
																height: "40%",
															}}></div>
														<div className="dashboard-user-health-detail-pedometer-pattern-status-day">
															S
														</div>
													</div>
												</div>
											</div>
											<div className="dashboard-user-health-detail-container dashboard-user-health-detail-mind">
												<div className="dashboard-user-health-detail-heading dashboard-user-health-detail-pedometer-pattern-pic">
													<div className="dashboard-user-health-detail-heading-rectangle dashboard-user-health-detail-mind-pattern-rectangle">
														<svg
															width="25"
															height="25"
															viewBox="0 0 25 25"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M12.6214 6.27828C14.3712 6.27828 15.7896 4.87284 15.7896 3.13914C15.7896 1.40544 14.3712 0 12.6214 0C10.8716 0 9.45312 1.40544 9.45312 3.13914C9.45312 4.87284 10.8716 6.27828 12.6214 6.27828Z"
																fill="#B50000"
															/>
															<path
																d="M24.4088 17.6625C24.3681 17.6019 24.3171 17.5514 24.2662 17.501L20.6701 14.1902L18.3474 9.24433C17.7157 7.98262 16.7989 7.19531 15.4338 7.19531H9.57608C8.20079 7.19531 7.29412 7.98262 6.66251 9.24433L4.3398 14.1902L0.743676 17.501C0.69274 17.5514 0.641804 17.612 0.601054 17.6625C0.234311 17.9754 0 18.4397 0 18.9545C0 19.8932 0.774239 20.6603 1.72166 20.6603C2.28196 20.6603 2.77095 20.3979 3.08676 19.984C3.11732 19.9638 3.14788 19.9336 3.16826 19.9134L6.97831 16.4008C7.12094 16.2594 7.233 16.098 7.3145 15.9163L8.52679 13.3424L8.46566 17.8845L3.14788 20.7511C2.18009 21.276 1.72166 22.4065 2.06803 23.4462C2.4144 24.4858 3.4535 25.1318 4.54354 24.9804L12.4998 22.9415L20.4561 24.9804C21.5462 25.1318 22.5955 24.4858 22.9317 23.4462C23.278 22.4065 22.8196 21.276 21.8518 20.7511L16.534 17.8744L16.4729 13.3323L17.6852 15.9062C17.7667 16.0879 17.8889 16.2494 18.0214 16.3907L21.8314 19.9033C21.862 19.9336 21.8824 19.9537 21.9129 19.9739C22.2287 20.3777 22.7177 20.6502 23.278 20.6502C24.2254 20.6502 24.9997 19.8831 24.9997 18.9444C25.0099 18.4296 24.7756 17.9754 24.4088 17.6625Z"
																fill="#B50000"
															/>
														</svg>
													</div>
													<div className="dashboard-user-health-detail-heading-word">
														Mind Relaxation
													</div>
												</div>
												<div className="dashboard-user-health-detail-graph-container dashboard-user-health-detail-mind-pattern-status">
													<svg
														width="98"
														height="98"
														viewBox="0 0 98 98"
														fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<path
															d="M36.1079 12.777C34.3474 13.3992 32.6348 14.1492 30.9837 15.0211L42.1627 36.1897C42.7819 35.8627 43.4241 35.5815 44.0843 35.3482L36.1079 12.777Z"
															fill="#B50000"
															stroke="white"
														/>
														<path
															d="M30.9871 15.0151C23.7009 18.8629 17.8498 24.9578 14.3024 32.3949C10.755 39.832 9.7005 48.2148 11.2954 56.2988C12.8903 64.3828 17.0497 71.7369 23.1559 77.2694C29.2621 82.8019 36.9897 86.2178 45.1913 87.01L47.4927 63.1818C44.4171 62.8847 41.5193 61.6038 39.2295 59.5291C36.9396 57.4544 35.3799 54.6966 34.7818 51.6651C34.1837 48.6336 34.5791 45.49 35.9094 42.7011C37.2397 39.9122 39.4338 37.6266 42.1662 36.1837L30.9871 15.0151Z"
															fill="#B50000"
															fill-opacity="0.7"
															stroke="white"
														/>
														<path
															d="M45.1954 87.0093C48.9175 87.3688 52.6721 87.1813 56.3398 86.4528L51.676 62.9724C50.3006 63.2456 48.8926 63.3159 47.4968 63.1811L45.1954 87.0093Z"
															fill="#B50000"
															stroke="white"
														/>
														<path
															d="M56.3217 86.4563C62.6171 85.2059 68.4974 82.3935 73.4223 78.2775C78.3471 74.1615 82.1587 68.8739 84.5068 62.9005L62.2273 54.1425C61.3468 56.3825 59.9174 58.3654 58.0706 59.9089C56.2238 61.4524 54.0187 62.507 51.6579 62.9759L56.3217 86.4563Z"
															fill="#B50000"
															fill-opacity="0.2"
															stroke="white"
														/>
														<path
															d="M84.5156 62.8793C87.1625 56.1459 87.8482 48.8006 86.4933 41.6936C85.1384 34.5867 81.7984 28.0088 76.8599 22.7215L59.3652 39.0621C61.2171 41.0449 62.4696 43.5116 62.9777 46.1767C63.4858 48.8418 63.2287 51.5963 62.2361 54.1213L84.5156 62.8793Z"
															fill="#B50000"
															fill-opacity="0.5"
															stroke="white"
														/>
														<path
															d="M76.8677 22.7294C72.0887 17.6128 65.9987 13.904 59.2595 12.0061C52.5204 10.1081 45.39 10.0936 38.6432 11.9641L45.0388 35.033C47.5689 34.3316 50.2428 34.337 52.77 35.0488C55.2971 35.7605 57.5809 37.1513 59.373 39.07L76.8677 22.7294Z"
															fill="#B50000"
															stroke="white"
														/>
														<path
															d="M38.6429 11.9593C37.7909 12.1955 36.9473 12.4612 36.1137 12.7558L44.0901 35.3269C44.4027 35.2164 44.719 35.1168 45.0386 35.0283L38.6429 11.9593Z"
															fill="#B50000"
															fill-opacity="0.4"
															stroke="white"
														/>
													</svg>
												</div>
											</div>
											<div className="dashboard-user-health-detail-container dashboard-user-health-detail-journal">
												<div className="dashboard-user-health-detail-heading dashboard-user-health-detail-journal-pattern-pic">
													<div className="dashboard-user-health-detail-heading-rectangle dashboard-user-health-detail-journal-pattern-rectangle">
														<svg
															width="25"
															height="25"
															viewBox="0 0 25 25"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M12.6214 6.27828C14.3712 6.27828 15.7896 4.87284 15.7896 3.13914C15.7896 1.40544 14.3712 0 12.6214 0C10.8716 0 9.45312 1.40544 9.45312 3.13914C9.45312 4.87284 10.8716 6.27828 12.6214 6.27828Z"
																fill="#B50000"
															/>
															<path
																d="M24.4088 17.6625C24.3681 17.6019 24.3171 17.5514 24.2662 17.501L20.6701 14.1902L18.3474 9.24433C17.7157 7.98262 16.7989 7.19531 15.4338 7.19531H9.57608C8.20079 7.19531 7.29412 7.98262 6.66251 9.24433L4.3398 14.1902L0.743676 17.501C0.69274 17.5514 0.641804 17.612 0.601054 17.6625C0.234311 17.9754 0 18.4397 0 18.9545C0 19.8932 0.774239 20.6603 1.72166 20.6603C2.28196 20.6603 2.77095 20.3979 3.08676 19.984C3.11732 19.9638 3.14788 19.9336 3.16826 19.9134L6.97831 16.4008C7.12094 16.2594 7.233 16.098 7.3145 15.9163L8.52679 13.3424L8.46566 17.8845L3.14788 20.7511C2.18009 21.276 1.72166 22.4065 2.06803 23.4462C2.4144 24.4858 3.4535 25.1318 4.54354 24.9804L12.4998 22.9415L20.4561 24.9804C21.5462 25.1318 22.5955 24.4858 22.9317 23.4462C23.278 22.4065 22.8196 21.276 21.8518 20.7511L16.534 17.8744L16.4729 13.3323L17.6852 15.9062C17.7667 16.0879 17.8889 16.2494 18.0214 16.3907L21.8314 19.9033C21.862 19.9336 21.8824 19.9537 21.9129 19.9739C22.2287 20.3777 22.7177 20.6502 23.278 20.6502C24.2254 20.6502 24.9997 19.8831 24.9997 18.9444C25.0099 18.4296 24.7756 17.9754 24.4088 17.6625Z"
																fill="#B50000"
															/>
														</svg>
													</div>
													<div className="dashboard-user-health-detail-heading-word">
														Journal
													</div>
												</div>
												<div className="dashboard-user-health-detail-graph-container">
													<svg
														width="113"
														height="64"
														viewBox="0 0 113 64"
														fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<rect
															x="65.9922"
															y="0.09375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
														/>
														<rect
															x="98.5625"
															y="0.09375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.7"
														/>
														<rect
															x="82.2812"
															y="0.09375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
														/>
														<rect
															x="17.1484"
															y="0.09375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.1"
														/>
														<rect
															x="49.7109"
															y="0.09375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.7"
														/>
														<rect
															x="33.4375"
															y="0.09375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.2"
														/>
														<rect
															x="0.867188"
															y="0.09375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.1"
														/>
														<rect
															x="65.9922"
															y="16.375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
														/>
														<rect
															x="98.5625"
															y="16.375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.5"
														/>
														<rect
															x="82.2812"
															y="16.375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.6"
														/>
														<rect
															x="17.1484"
															y="16.375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.4"
														/>
														<rect
															x="49.7109"
															y="16.375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.7"
														/>
														<rect
															x="33.4375"
															y="16.375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.4"
														/>
														<rect
															x="0.867188"
															y="16.375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.1"
														/>
														<rect
															x="65.9922"
															y="32.6484"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
														/>
														<rect
															x="98.5625"
															y="32.6484"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.5"
														/>
														<rect
															x="82.2812"
															y="32.6484"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.7"
														/>
														<rect
															x="17.1484"
															y="32.6484"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.7"
														/>
														<rect
															x="49.7109"
															y="32.6484"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.7"
														/>
														<rect
															x="33.4375"
															y="32.6484"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.7"
														/>
														<rect
															x="0.867188"
															y="32.6484"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.1"
														/>
														<rect
															x="65.9922"
															y="48.9375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.5"
														/>
														<rect
															x="98.5625"
															y="48.9375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.5"
														/>
														<rect
															x="82.2812"
															y="48.9375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.5"
														/>
														<rect
															x="17.1484"
															y="48.9375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.7"
														/>
														<rect
															x="49.7109"
															y="48.9375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
														/>
														<rect
															x="33.4375"
															y="48.9375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
														/>
														<rect
															x="0.867188"
															y="48.9375"
															width="14.2823"
															height="14.2823"
															rx="5"
															fill="#EEB664"
															fill-opacity="0.7"
														/>
													</svg>
												</div>
											</div>
											<div className="dashboard-user-health-detail-container dashboard-user-health-detail-focused-hour">
												<div className="dashboard-user-health-detail-heading dashboard-user-health-detail-pedometer-pattern-pic">
													<div className="dashboard-user-health-detail-heading-rectangle dashboard-user-health-detail-focused-pattern-rectangle">
														<svg
															width="25"
															height="25"
															viewBox="0 0 25 25"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
																d="M25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4036 0 25 5.59644 25 12.5ZM12.5 5.46875C12.5 5.03728 12.1502 4.6875 11.7188 4.6875C11.2873 4.6875 10.9375 5.03728 10.9375 5.46875V14.0625C10.9375 14.3429 11.0877 14.6017 11.3311 14.7408L16.7999 17.8658C17.1745 18.0799 17.6517 17.9497 17.8658 17.5751C18.0799 17.2005 17.9497 16.7233 17.5751 16.5092L12.5 13.6091V5.46875Z"
																fill="#D19D6F"
															/>
														</svg>
													</div>
													<div className="dashboard-user-health-detail-heading-word">
														Focused Hour
													</div>
												</div>
												<div className="dashboard-user-health-detail-graph-container">
													<svg
														width="123"
														height="78"
														viewBox="0 0 123 78"
														fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<path
															d="M106.195 19.1172L17.1141 19.1172C16.0884 19.1172 15.2578 19.4209 15.2578 19.7959V26.5816C15.2578 26.9566 16.0884 27.2603 17.1141 27.2603L106.195 27.2603C107.221 27.2603 108.051 26.9566 108.051 26.5816V19.7954C108.051 19.4209 107.221 19.1172 106.195 19.1172Z"
															fill="#D19D6F"
														/>
														<path
															d="M69.336 8.73471V8.71094L17.1141 8.71094C16.0884 8.71094 15.2578 9.01463 15.2578 9.38964V16.1753C15.2578 16.5504 16.0884 16.854 17.1141 16.854H69.336V16.8303C70.1359 16.7545 70.7285 16.4916 70.7285 16.1758V9.38919C70.7285 9.07339 70.1359 8.81052 69.336 8.73471Z"
															fill="#D19D6F"
															fill-opacity="0.5"
														/>
														<path
															d="M81.141 29.4609L17.1141 29.4609C16.0884 29.4609 15.2578 29.7646 15.2578 30.1396V36.9253C15.2578 37.3004 16.0884 37.604 17.1141 37.604H81.141C82.1667 37.604 82.9973 37.3004 82.9973 36.9253V30.1396C82.9973 29.7646 82.1667 29.4609 81.141 29.4609Z"
															fill="#D19D6F"
															fill-opacity="0.5"
														/>
														<path
															d="M44.9531 56.5549V50.2178C44.9531 49.8428 44.1225 49.5391 43.0969 49.5391H16.1866C15.1609 49.5391 14.3303 49.8428 14.3303 50.2178V56.5549C14.3303 56.9299 15.1609 57.2331 16.1866 57.2331H43.0981C44.1238 57.2331 44.9531 56.9294 44.9531 56.5549Z"
															fill="#D19D6F"
															fill-opacity="0.5"
														/>
														<path
															d="M100.508 66.4377V60.1006C100.508 59.7256 99.6772 59.4219 98.6515 59.4219L16.1834 59.4219C15.1578 59.4219 14.3272 59.7256 14.3272 60.1006V66.4377C14.3272 66.8127 15.1578 67.1164 16.1834 67.1164H98.6515C99.6772 67.1164 100.508 66.8127 100.508 66.4377Z"
															fill="#D19D6F"
														/>
														<path
															d="M75.4453 76.3518V70.0146C75.4453 69.6396 74.6147 69.3359 73.589 69.3359H16.175C15.1493 69.3359 14.3187 69.6396 14.3187 70.0146V76.3513C14.3187 76.7263 15.1493 77.03 16.175 77.03H73.589C74.6135 77.03 75.4453 76.7263 75.4453 76.3518Z"
															fill="#D19D6F"
															fill-opacity="0.5"
														/>
														<path
															d="M75.4453 46.6252V40.2881C75.4453 39.9131 74.6147 39.6094 73.589 39.6094L16.175 39.6094C15.1493 39.6094 14.3187 39.9131 14.3187 40.2881V46.6252C14.3187 47.0002 15.1493 47.3039 16.175 47.3039H73.589C74.6135 47.3039 75.4453 47.0002 75.4453 46.6252Z"
															fill="#D19D6F"
														/>
													</svg>
												</div>
											</div>
										</div>
									</div>
									<div className="dashboard-user-element-row2">
										<div className="dashborad-user-details-todo-section">
											<div className="dashborad-user-details-todo-section-heading">
												<h2>To Do List</h2>
											</div>
											<div className="dashborad-user-details-todo-section-todo-list">
												<div>
													<input
														type="checkbox"
														id="vehicle1"
														name="vehicle1"
													/>
													<label for="vehicle1">
														{" "}
														Take a Walk
													</label>
												</div>
												<div>
													<input
														type="checkbox"
														id="vehicle2"
														name="vehicle2"
													/>
													<label for="vehicle2">
														{" "}
														Read a Book
													</label>
												</div>
												<div>
													<input
														type="checkbox"
														id="vehicle3"
														name="vehicle3"
													/>
													<label for="vehicle3">
														{" "}
														Drink more water
													</label>
												</div>
												<div>
													<input
														type="checkbox"
														id="vehicle3"
														name="vehicle3"
													/>
													<label for="vehicle3">
														{" "}
														Attempt some streching
														exercise
													</label>
												</div>
												<div>
													<input
														type="checkbox"
														id="vehicle3"
														name="vehicle3"
													/>
													<label for="vehicle3">
														{" "}
														Connect to someone new
													</label>
												</div>
												<div>
													<input
														type="checkbox"
														id="vehicle3"
														name="vehicle3"
													/>
													<label for="vehicle3">
														{" "}
														Talk to your loved ones
													</label>
												</div>
											</div>
										</div>
										<div className="dashboard-user-element-physical-meet">
											<div className="dashboard-user-element-physical-meet-profile">
												<svg
													width="100"
													height="104"
													viewBox="0 0 100 104"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<g clip-path="url(#clip0_982_383)">
														<mask
															id="mask0_982_383"
															maskUnits="userSpaceOnUse"
															x="0"
															y="0"
															width="100"
															height="104">
															<path
																d="M100 0H0V103.65H100V0Z"
																fill="white"
															/>
														</mask>
														<g mask="url(#mask0_982_383)">
															<path
																d="M25 12.9531H75V19.4313H81.25V38.8656H87.5V51.8219H81.25V71.2563H75V77.7344H56.25V84.2125H81.25V90.6907H87.5V103.647H12.5V90.6907H18.75V84.2125H43.75V77.7344H25V71.2563H18.75V51.8219H12.5V38.8656H18.75V19.4313H25V12.9531Z"
																fill="#EAC393"
															/>
															<path
																d="M25 12.9531H75V19.4313H81.25V38.8656H87.5V51.8219H81.25V71.2563H75V77.7344H25V71.2563H18.75V51.8219H12.5V38.8656H18.75V19.4313H25V12.9531Z"
																fill="white"
																fill-opacity="0.1"
															/>
															<path
																d="M37.5 90.6953H25V97.1734H18.75V103.652H43.75V97.1734H37.5V90.6953ZM75 97.1734H81.25V103.652H56.25V97.1734H62.5V90.6953H75V97.1734Z"
																fill="#AE0001"
															/>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M31.25 38.8672H37.5V51.8234H25V45.3453H31.25V38.8672ZM62.5 38.8672H68.75V51.8234H56.25V45.3453H62.5V38.8672Z"
																fill="#222222"
															/>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M37.5 38.8672V45.3453H31.25V51.8234H43.75V38.8672H37.5ZM68.75 38.8672V45.3453H62.5V51.8234H75V38.8672H68.75Z"
																fill="#76778B"
															/>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M37.5 38.8672V45.3453H43.75V38.8672H37.5ZM31.25 45.3453V51.8234H37.5V45.3453H31.25ZM68.75 38.8672V45.3453H75V38.8672H68.75ZM62.5 45.3453V51.8234H68.75V45.3453H62.5Z"
																fill="white"
																fill-opacity="0.5"
															/>
															<path
																d="M50 64.7812V71.2594H56.25V64.7812H50Z"
																fill="#C98276"
															/>
															<path
																d="M75 6.47656H31.25V12.9547H25V19.4328H18.75V25.9109H12.5V38.8672H25V32.3891H31.25V25.9109H37.5V19.4328H68.75V25.9109H75V32.3891H81.25V38.8672H87.5V19.4328H81.25V12.9547H75V6.47656ZM81.25 51.8235H87.5V90.6922H81.25V84.2141H56.25V77.736H75V71.2579H81.25V51.8235ZM12.5 51.8235H18.75V71.2579H25V77.736H43.75V84.2141H18.75V90.6922H12.5V51.8235Z"
																fill="#28150A"
															/>
														</g>
														<rect
															x="8"
															y="29.0234"
															width="5"
															height="46.6425"
															fill="#2D1601"
														/>
														<rect
															x="87"
															y="30.0547"
															width="4"
															height="40.4235"
															fill="#261506"
														/>
													</g>
													<rect
														x="0.5"
														y="0.5"
														width="99"
														height="102.65"
														rx="49.5"
														stroke="white"
													/>
													<defs>
														<clipPath id="clip0_982_383">
															<rect
																width="100"
																height="103.65"
																rx="50"
																fill="white"
															/>
														</clipPath>
													</defs>
												</svg>
												<div
													className="dashboard-user-element-physical-meet-profile-name"
													// style="font-size: 30px; font-weight: bold; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
												>
													Janvni Pandey
												</div>
											</div>
											<div className="dashboard-user-element-physical-meet-meetup">
												<Button
													type={"fill"}
													style={{
														borderRadius: "10px",
													}}>
													Plan a get together soon
													with your buddy
												</Button>
											</div>
											<div className="dashboard-user-element-physical-meet-call">
												<Button
													type={"fill"}
													style={{
														borderRadius: "10px",
													}}>
													Schedule a voice/video call
													with your zenbuddy
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : null}
						{currentScreen === "meet" ? (
							<VideoCall
								userData={userData}
								isVideo={isVideo}
								isVoice={isVoice}
								setIsVideo={setIsVideo}
								setIsVoice={setIsVoice}
								localStream={localStream}
								remoteStream={remoteStream}
								handleCallUser={handleCallUser}></VideoCall>
						) : null}
						{currentScreen === "chat" ? (
							<ChatPage
								userData={userData}
								chat={chat}
								setCurrentChat={setCurrentChat}
								currentChat={currentChat}
								friends={friends}
								socket={socket}></ChatPage>
						) : null}
						{currentScreen === "ai" ? (
							<AiChat
								userData={userData}
								chat={chat}
								setCurrentChat={setCurrentChat}
								currentChat={currentChat}
								socket={socket}></AiChat>
						) : null}
						{currentScreen === "todo" ? <Todo></Todo> : null}
						{currentScreen === "quiz" ? <Quiz></Quiz> : null}
						{currentScreen === "meditate" ? (
							<Meditate></Meditate>
						) : null}
					</div>
				</div>
			) : null}
		</>
	);
};

export default Dashboard;
