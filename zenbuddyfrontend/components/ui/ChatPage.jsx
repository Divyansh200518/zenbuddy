"use client";

import Navbar from "./Db-Navbar";
import Button from "./Button";
import "../component.css";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { Firestore } from "firebase/firestore";

const ChatPage = ({
	userData,
	currentChat,
	setCurrentChat,
	chat,
	socket,
	friends,
}) => {
	// const [currentUser, setCurrentUser] = useState({});
	const [inputChat, setInputChat] = useState("");
	const [friendName, setFriendName] = useState("");
	const inputRef = useRef(null);
	const chatScrollRef = useRef(null);

	useEffect(() => {
		// console.log();
		chatScrollRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "nearest",
		});
	}, [chat]);

	const handleCurrentChat = (friend) => {
		setCurrentChat(friend);
	};

	const addFriend = () => {
		console.log(friendName);
		socket.emit("addFriend", {
			sender: userData.email,
			email: friendName,
		});
	};

	const handleChatSend = () => {
		if (inputChat) {
			socket.emit("chatMessage", {
				receiver: { email: currentChat.email },
				sender: { email: userData.email },
				data: {
					msg: inputChat,
					displayName: userData.displayName,
					email: userData.email,
					uid: userData.uid,
				},
			});
			setInputChat("");
		}
	};

	return (
		// <div className="chat-page-body-wrapper">
		// {/* <Navbar userDetail={userData}></Navbar> */}
		<div className="chat-page-user-main-chat-wrapper">
			{currentChat.email ? (
				<div className="chat-page-user-main-chat-container">
					<div className="chat-page-user-main-chat-screen">
						<div className="chat-page-user-main-chat-screen-user-detail-container">
							<div className="chat-page-user-main-chat-screen-user-profile-pic">
								<img src={currentChat.photoUrl} alt="" />
							</div>
							<div className="chat-page-user-main-chat-screen-user-profile-name-status">
								<div className="chat-page-user-main-chat-screen-user-profile-name">
									{currentChat.displayName}
								</div>
								<div className="chat-page-user-main-chat-screen-user-profile-status">
									{currentChat.status}
								</div>
							</div>
						</div>
						<div className="chat-page-user-main-message-chat-screen">
							{chat[currentChat.email]
								? chat[currentChat.email].map(
										(message, index) => {
											return message.email ===
												userData.email ? (
												<div
													key={index}
													className="chat-page-user-main-message-user-chat-container">
													{message.msg}
												</div>
											) : (
												<div
													key={index}
													className="chat-page-user-main-message-friend-chat-container">
													{message.msg}
												</div>
											);
										}
								  )
								: "No Chat"}
							<div
								className="chat-page-user-main-message-chat-scroll-ref"
								ref={chatScrollRef}></div>
							{/* <div className="chat-page-user-main-message-user-chat-container">
								Gendu
							</div>
							<div className="chat-page-user-main-message-friend-chat-container">
								Yes Me Gendu
							</div> */}
						</div>
					</div>
					<div className="chat-page-user-main-chat-message-box">
						<input
							ref={inputRef}
							className="chat-page-user-main-chat-message-box"
							type="text"
							placeholder="Type Message"
							value={inputChat}
							onChange={(e) =>
								setInputChat(e.currentTarget.value)
							}
							onKeyDown={(e) => {
								e.key === "Enter" ? handleChatSend() : null;
							}}
						/>
						<Button
							type={"ghost"}
							onClick={handleChatSend}
							className="chat-page-user-main-chat-message-box-send-button">
							<svg
								width="32"
								height="32"
								viewBox="0 0 60 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M28.7468 30.0032H13.5429M13.1119 31.9962L10.6 39.4997C9.2243 43.6092 8.53642 45.6639 9.03007 46.9292C9.45875 48.0282 10.3795 48.8612 11.5156 49.1784C12.8239 49.5434 14.7999 48.6542 18.7519 46.8759L44.0878 35.4747C47.9453 33.7387 49.8741 32.8709 50.4701 31.6652C50.9881 30.6177 50.9881 29.3884 50.4701 28.3409C49.8741 27.1354 47.9453 26.2674 44.0878 24.5315L18.7082 13.1107C14.7681 11.3377 12.798 10.4512 11.4911 10.8149C10.356 11.1307 9.4354 11.9616 9.00522 13.0584C8.50987 14.3214 9.1904 16.3717 10.5515 20.4723L13.1168 28.2014C13.3506 28.9057 13.4675 29.2579 13.5136 29.6179C13.5545 29.9377 13.5541 30.2612 13.5124 30.5807C13.4653 30.9407 13.3475 31.2924 13.1119 31.9962Z"
									stroke="var(--textColor)"
									strokeWidth="5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Button>
						{/* <div className="chat-page-user-main-chat-message-box-mic-button">
							<Button type="ghost">
								<svg
									width="26"
									height="25"
									viewBox="0 0 26 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12.627 13.4766C13.9526 13.4766 15.0195 12.4219 15.0195 11.1328V5.66406C15.0195 4.375 13.9526 3.32031 12.627 3.32031C11.3013 3.32031 10.2344 4.375 10.2344 5.66406V11.1328C10.2344 12.4219 11.3013 13.4766 12.627 13.4766Z"
										fill="var(--lg)"
									/>
									<path
										d="M20.6836 11.0859C20.6836 10.9785 20.5957 10.8906 20.4883 10.8906H19.0234C18.916 10.8906 18.8281 10.9785 18.8281 11.0859C18.8281 14.5112 16.0522 17.2871 12.627 17.2871C9.20166 17.2871 6.42578 14.5112 6.42578 11.0859C6.42578 10.9785 6.33789 10.8906 6.23047 10.8906H4.76562C4.6582 10.8906 4.57031 10.9785 4.57031 11.0859C4.57031 15.2046 7.66113 18.603 11.6504 19.084V21.584H8.10303C7.76855 21.584 7.5 21.9331 7.5 22.3652V23.2441C7.5 23.3516 7.56836 23.4395 7.65137 23.4395H17.6025C17.6855 23.4395 17.7539 23.3516 17.7539 23.2441V22.3652C17.7539 21.9331 17.4854 21.584 17.1509 21.584H13.5059V19.0962C17.5415 18.6567 20.6836 15.2388 20.6836 11.0859Z"
										fill="var(--textColor)"
									/>
									<path
										d="M12.627 15.2344C14.9194 15.2344 16.7773 13.3984 16.7773 11.1328V5.66406C16.7773 3.39844 14.9194 1.5625 12.627 1.5625C10.3345 1.5625 8.47656 3.39844 8.47656 5.66406V11.1328C8.47656 13.3984 10.3345 15.2344 12.627 15.2344ZM10.2344 5.66406C10.2344 4.375 11.3013 3.32031 12.627 3.32031C13.9526 3.32031 15.0195 4.375 15.0195 5.66406V11.1328C15.0195 12.4219 13.9526 13.4766 12.627 13.4766C11.3013 13.4766 10.2344 12.4219 10.2344 11.1328V5.66406Z"
										fill="var(--textColor)"
									/>
								</svg>
							</Button>
						</div>
						<div className="chat-page-user-main-chat-message-box-sticker-button">
							<Button type="ghost">
								<svg
									width="23"
									height="23"
									viewBox="0 0 23 23"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M11.8255 1.95469C11.3464 1.87344 10.6922 1.86719 9.51302 1.86719C7.51615 1.86719 6.09635 1.86927 5.02135 2.01302C3.96719 2.15365 3.36198 2.41927 2.92135 2.85885C2.48073 3.29948 2.21615 3.90365 2.07552 4.95156C1.93177 6.0224 1.92969 7.43281 1.92969 9.42031V13.587C1.92969 15.5724 1.93177 16.9828 2.07552 18.0536C2.21615 19.1016 2.48073 19.7057 2.92135 20.1474C3.36198 20.587 3.96615 20.8516 5.01406 20.9922C6.0849 21.137 7.49531 21.138 9.48177 21.138H13.6484C15.6349 21.138 17.0464 21.1359 18.1172 20.9922C19.1641 20.8516 19.7682 20.587 20.2089 20.1464C20.6495 19.7057 20.9141 19.1016 21.0547 18.0536C21.1984 16.9839 21.2005 15.5724 21.2005 13.5859V13.1307C21.2005 11.5307 21.1901 10.7724 21.0193 10.2005H17.7589C16.5786 10.2005 15.6151 10.2005 14.8526 10.0984C14.0578 9.99115 13.3682 9.7599 12.8172 9.20885C12.2661 8.65781 12.0349 7.96927 11.9276 7.1724C11.8255 6.41198 11.8255 5.4474 11.8255 4.26615V1.95469ZM13.388 2.76302V4.21094C13.388 5.46094 13.3901 6.31927 13.4766 6.96406C13.5599 7.58698 13.7099 7.89219 13.9224 8.10365C14.1339 8.31615 14.4391 8.46615 15.062 8.54948C15.7068 8.63594 16.5651 8.63802 17.8151 8.63802H19.9193C19.5195 8.25739 19.1132 7.88372 18.7005 7.51719L14.5766 3.80573C14.1875 3.45011 13.7913 3.10247 13.388 2.76302ZM9.66406 0.304688C11.1068 0.304688 12.0391 0.304688 12.8964 0.632813C13.7536 0.961979 14.4432 1.58281 15.5109 2.54427L15.6224 2.64427L19.7453 6.35573L19.8755 6.4724C21.1089 7.58177 21.9068 8.29948 22.3349 9.26198C22.7641 10.2245 22.7641 11.2974 22.763 12.9557V13.6443C22.763 15.5589 22.763 17.0755 22.6036 18.262C22.4391 19.4828 22.0932 20.4714 21.3141 21.2516C20.5339 22.0307 19.5453 22.3766 18.3245 22.5411C17.137 22.7005 15.6214 22.7005 13.7068 22.7005H9.42344C7.50885 22.7005 5.99219 22.7005 4.80573 22.5411C3.5849 22.3766 2.59635 22.0307 1.81615 21.2516C1.03698 20.4714 0.691146 19.4828 0.526562 18.262C0.367188 17.0745 0.367188 15.5589 0.367188 13.6443V9.36198C0.367188 7.4474 0.367188 5.93073 0.526562 4.74427C0.691146 3.52344 1.03698 2.5349 1.81615 1.75469C2.5974 0.974479 3.58802 0.629688 4.81406 0.465104C6.00573 0.305729 7.52969 0.305729 9.45469 0.305729H9.51302L9.66406 0.304688Z"
										fill="var(--textColor)"
									/>
								</svg>
							</Button>
						</div> */}
					</div>
				</div>
			) : (
				<div className="chat-page-user-main-chat-container">
					Select friend to chat
				</div>
			)}
			<div className="chat-page-user-main-friends-container">
				<div className="chat-page-user-main-friends-screen-heading-container">
					<h2>Friends</h2>
				</div>
				<div className="chat-page-user-main-friends-screen-list">
					<div className="chat-page-user-main-friends-search-container">
						<label htmlFor="search-friends">
							<svg
								width="35"
								height="34"
								viewBox="0 0 35 34"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M28.1935 28.548L19.3223 19.6769C18.614 20.2804 17.7994 20.7474 16.8785 21.0779C15.9577 21.4085 15.0322 21.5738 14.1019 21.5738C11.8333 21.5738 9.91326 20.7885 8.34171 19.2179C6.77015 17.6463 5.98438 15.7267 5.98438 13.4591C5.98438 11.1915 6.76921 9.27097 8.33887 7.69752C9.90949 6.12313 11.8286 5.33594 14.0962 5.33594C16.3648 5.33594 18.2858 6.12172 19.8592 7.69327C21.4327 9.26483 22.2194 11.1854 22.2194 13.4549C22.2194 14.439 22.0451 15.3914 21.6966 16.3123C21.3472 17.2331 20.8891 18.0208 20.3225 18.6753L29.1936 27.545L28.1935 28.548ZM14.1019 20.1557C15.9813 20.1557 17.5685 19.5087 18.8633 18.2149C20.1572 16.921 20.8041 15.3338 20.8041 13.4534C20.8041 11.574 20.1572 9.98733 18.8633 8.69344C17.5694 7.39955 15.9827 6.7526 14.1033 6.7526C12.2238 6.7526 10.6367 7.39955 9.34187 8.69344C8.04799 9.98733 7.40104 11.574 7.40104 13.4534C7.40104 15.3329 8.04799 16.9195 9.34187 18.2134C10.6358 19.5073 12.2224 20.1557 14.1019 20.1557Z"
									fill="white"
								/>
							</svg>
						</label>
						<input
							value={friendName}
							onChange={(e) => {
								setFriendName(e.target.value);
							}}
							type="text"
							id="search-friends"
							placeholder="search"
						/>
						<Button
							onClick={() => {
								addFriend();
							}}>
							Add
						</Button>
					</div>
					<div className="chat-page-user-main-friends-online-list-container">
						<div className="chat-page-user-main-friends-online-list-inner-container">
							{friends.map((friend, index) => {
								return friend.status !== "offline" ? (
									<div
										key={index}
										className="chat-page-user-main-friends-online-persona">
										<img src={friend.photoUrl} />
										<div className="chat-page-user-main-friends-online-persona-online-status"></div>
									</div>
								) : (
									<div
										key={index}
										className="chat-page-user-main-friends-online-persona">
										<img src={friend.photoUrl} />
										<div
											className="chat-page-user-main-friends-online-persona-online-status"
											style={{
												backgroundColor: "red",
											}}></div>
									</div>
								);
							})}
						</div>
					</div>
					{friends.map((friend, index) => {
						return (
							<div
								key={index}
								className="chat-page-user-main-friends"
								onClick={() => handleCurrentChat(friend)}
								data-email={friend.email}
								data-photourl={friend.photoUrl}
								data-status={friend.status}
								data-displayname={friend.displayName}>
								<div className="chat-page-user-main-friends-status-color">
									<svg
										width="8"
										height="8"
										viewBox="0 0 8 8"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<circle
											cx="4"
											cy="4"
											r="4"
											fill={
												friend.status === "online"
													? "#00FF0A"
													: "red"
											}
										/>
									</svg>
								</div>
								<div className="chat-page-user-main-friends-profile-pic">
									<img
										src={
											friend.photoUrl ||
											"https://api.dicebear.com/7.x/pixel-art/svg"
										}
										alt=""
									/>
								</div>
								<div className="chat-page-user-main-friends-name">
									{friend.displayName}
								</div>
							</div>
						);
					})}
					{/* <div className="chat-page-user-main-friends">
							<div className="chat-page-user-main-friends-status-color">
								<svg
									width="8"
									height="8"
									viewBox="0 0 8 8"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<circle
										cx="4"
										cy="4"
										r="4"
										fill="#00FF0A"
									/>
								</svg>
							</div>
							<div className="chat-page-user-main-friends-profile-pic">
								<div>
									<svg
										width="30"
										height="32"
										viewBox="0 0 30 32"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<g clipPath="url(#clip0_1038_749)">
											<mask
												id="mask0_1038_749"
												// style="mask-type:luminance"
												maskUnits="userSpaceOnUse"
												x="0"
												y="0"
												width="30"
												height="32">
												<path
													d="M30 0.148438H0V31.0545H30V0.148438Z"
													fill="white"
												/>
											</mask>
											<g mask="url(#mask0_1038_749)">
												<path
													d="M7.5 4.00781H22.5V5.93944H24.375V11.7343H26.25V15.5976H24.375V21.3925H22.5V23.3241H16.875V25.2557H24.375V27.1873H26.25V31.0506H3.75V27.1873H5.625V25.2557H13.125V23.3241H7.5V21.3925H5.625V15.5976H3.75V11.7343H5.625V5.93944H7.5V4.00781Z"
													fill="#EAC393"
												/>
												<path
													d="M7.5 4.00781H22.5V5.93944H24.375V11.7343H26.25V15.5976H24.375V21.3925H22.5V23.3241H7.5V21.3925H5.625V15.5976H3.75V11.7343H5.625V5.93944H7.5V4.00781Z"
													fill="white"
													fillOpacity="0.1"
												/>
												<path
													d="M11.25 27.1875H7.5V29.1191H5.625V31.0508H13.125V29.1191H11.25V27.1875ZM22.5 29.1191H24.375V31.0508H16.875V29.1191H18.75V27.1875H22.5V29.1191Z"
													fill="#AE0001"
												/>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M9.375 11.7344H11.25V15.5976H7.5V13.666H9.375V11.7344ZM18.75 11.7344H20.625V15.5976H16.875V13.666H18.75V11.7344Z"
													fill="#F0F0F0"
												/>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M11.25 11.7344V13.666H9.375V15.5976H13.125V11.7344H11.25ZM20.625 11.7344V13.666H18.75V15.5976H22.5V11.7344H20.625Z"
													fill="#76778B"
												/>
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M11.25 11.7344V13.666H13.125V11.7344H11.25ZM9.375 13.666V15.5976H11.25V13.666H9.375ZM20.625 11.7344V13.666H22.5V11.7344H20.625ZM18.75 13.666V15.5976H20.625V13.666H18.75Z"
													fill="white"
													fillOpacity="0.5"
												/>
												<path
													d="M15 19.4609V21.3926H16.875V19.4609H15Z"
													fill="#C98276"
												/>
												<path
													d="M22.5 2.07812H9.375V4.00975H7.5V5.94138H5.625V7.87301H3.75V11.7363H7.5V9.80464H9.375V7.87301H11.25V5.94138H20.625V7.87301H22.5V9.80464H24.375V11.7363H26.25V5.94138H24.375V4.00975H22.5V2.07812ZM24.375 15.5995H26.25V27.1893H24.375V25.2577H16.875V23.326H22.5V21.3944H24.375V15.5995ZM3.75 15.5995H5.625V21.3944H7.5V23.326H13.125V25.2577H5.625V27.1893H3.75V15.5995Z"
													fill="#28150A"
												/>
											</g>
										</g>
										<defs>
											<clipPath id="clip0_1038_749">
												<rect
													width="30"
													height="30.906"
													fill="white"
													transform="translate(0 0.148438)"
												/>
											</clipPath>
										</defs>
									</svg>
								</div>
							</div>
							<div className="chat-page-user-main-friends-name">
								<h4>Ayush</h4>
							</div>
							<div className="chat-page-user-main-friends-message">
								<Button>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V10C16 11.1046 15.1046 12 14 12H4.41421C4.149 12 3.89464 12.1054 3.70711 12.2929L0.853553 15.1464C0.53857 15.4614 0 15.2383 0 14.7929V2ZM3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4H12.5C12.7761 4 13 3.77614 13 3.5C13 3.22386 12.7761 3 12.5 3H3.5ZM3.5 5.5C3.22386 5.5 3 5.72386 3 6C3 6.27614 3.22386 6.5 3.5 6.5H12.5C12.7761 6.5 13 6.27614 13 6C13 5.72386 12.7761 5.5 12.5 5.5H3.5ZM3.5 8C3.22386 8 3 8.22386 3 8.5C3 8.77614 3.22386 9 3.5 9H8.5C8.77614 9 9 8.77614 9 8.5C9 8.22386 8.77614 8 8.5 8H3.5Z"
											fill="var(--textColor)"
										/>
									</svg>
								</Button>
							</div>
						</div> */}

					{/* <!-- <div className="chat-page-user-main-friends"></div> --> */}
				</div>
			</div>
		</div>
		// </div>
	);
};

export default ChatPage;
