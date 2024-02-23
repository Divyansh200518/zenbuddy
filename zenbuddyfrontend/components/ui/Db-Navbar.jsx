"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button.jsx";
import { useState } from "react";
import { motion, AnimatePresence, animate, useAnimation } from "framer-motion";
import "../navbar.css";
import Profile from "./Profile.jsx";
const Navbar = ({ userDetail }) => {
	// const [isMenuOpen, setIsMenuOpen] = useState(false);
	// console.log({});
	const controls = useAnimation();
	const [userData, setUserData] = useState(userDetail);
	const router = useRouter();
	const [plusPopup, setPlusPopup] = useState(false);

	// const goToAuth = () => {
	// 	router.push("/login");
	// };

	// const handleMenuOpen = async () => {
	// 	setIsMenuOpen((prev) => !prev);
	// 	await controls.start(
	// 		isMenuOpen ? { x: "100%", width: "0" } : { x: 0, width: "100dvw" }
	// 	);
	// };

	return (
		<>
			<div className="navbar">
				<div className="navbar-first-elements">
					<Button type={"ghost"} onClick={() => router.push("?")}>
						<svg
							width="24"
							height="27"
							viewBox="0 0 24 27"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12 0L0 12.7089V25.555C0 26.1149 0.210714 26.6519 0.585786 27.0478C0.960859 27.4437 1.46957 27.6661 2 27.6661H9V17.1106H15V27.6661H22C22.5304 27.6661 23.0391 27.4437 23.4142 27.0478C23.7893 26.6519 24 26.1149 24 25.555V12.635L12 0Z"
								fill="#00ADB5"
							/>
						</svg>
					</Button>
					<Button
						type={"ghost"}
						className="hide-in-s-dev"
						onClick={() => router.push("?s=ai")}>
						<svg
							width="30"
							height="30"
							viewBox="0 0 30 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0 30V21.6667C0 20.75 0.3675 19.9656 1.1025 19.3133C1.8375 18.6611 2.72 18.3344 3.75 18.3333H26.25C27.2812 18.3333 28.1644 18.66 28.8994 19.3133C29.6344 19.9667 30.0012 20.7511 30 21.6667V30H0ZM9.375 16.6667C6.78125 16.6667 4.57062 15.8539 2.74312 14.2283C0.915625 12.6028 0.00125 10.6378 0 8.33333C0 6.02778 0.914375 4.06278 2.74312 2.43833C4.57187 0.813889 6.7825 0.00111111 9.375 0H20.625C23.2187 0 25.43 0.812777 27.2587 2.43833C29.0875 4.06389 30.0012 6.02889 30 8.33333C30 10.6389 29.0856 12.6044 27.2569 14.23C25.4281 15.8556 23.2175 16.6678 20.625 16.6667H9.375ZM9.375 10C9.90625 10 10.3519 9.84 10.7119 9.52C11.0719 9.2 11.2512 8.80444 11.25 8.33333C11.25 7.86111 11.07 7.46556 10.71 7.14667C10.35 6.82778 9.905 6.66778 9.375 6.66667C8.84375 6.66667 8.39875 6.82667 8.04 7.14667C7.68125 7.46667 7.50125 7.86222 7.5 8.33333C7.5 8.80556 7.68 9.20167 8.04 9.52167C8.4 9.84167 8.845 10.0011 9.375 10ZM20.625 10C21.1562 10 21.6019 9.84 21.9619 9.52C22.3219 9.2 22.5012 8.80444 22.5 8.33333C22.5 7.86111 22.32 7.46556 21.96 7.14667C21.6 6.82778 21.155 6.66778 20.625 6.66667C20.0937 6.66667 19.6487 6.82667 19.29 7.14667C18.9312 7.46667 18.7512 7.86222 18.75 8.33333C18.75 8.80556 18.93 9.20167 19.29 9.52167C19.65 9.84167 20.095 10.0011 20.625 10Z"
								fill="#00ADB5"
							/>
						</svg>
					</Button>
					<Button
						type={"ghost"}
						onClick={() => router.push("?s=chat")}>
						<svg
							width="30"
							height="30"
							viewBox="0 0 30 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0 3.75C0 1.67893 1.67893 0 3.75 0H26.25C28.3211 0 30 1.67893 30 3.75V18.75C30 20.8211 28.3211 22.5 26.25 22.5H8.27665C7.77937 22.5 7.30246 22.6975 6.95083 23.0492L1.60041 28.3996C1.00982 28.9902 0 28.5719 0 27.7367V3.75ZM6.5625 5.625C6.04473 5.625 5.625 6.04473 5.625 6.5625C5.625 7.08027 6.04473 7.5 6.5625 7.5H23.4375C23.9553 7.5 24.375 7.08027 24.375 6.5625C24.375 6.04473 23.9553 5.625 23.4375 5.625H6.5625ZM6.5625 10.3125C6.04473 10.3125 5.625 10.7322 5.625 11.25C5.625 11.7678 6.04473 12.1875 6.5625 12.1875H23.4375C23.9553 12.1875 24.375 11.7678 24.375 11.25C24.375 10.7322 23.9553 10.3125 23.4375 10.3125H6.5625ZM6.5625 15C6.04473 15 5.625 15.4197 5.625 15.9375C5.625 16.4553 6.04473 16.875 6.5625 16.875H15.9375C16.4553 16.875 16.875 16.4553 16.875 15.9375C16.875 15.4197 16.4553 15 15.9375 15H6.5625Z"
								fill="#00ADB5"
							/>
						</svg>
					</Button>
				</div>
				<div className="navbar-middle-elements">
					<Button
						type={"fill"}
						onClick={() => setPlusPopup(!plusPopup)}>
						<svg
							width="30"
							height="30"
							viewBox="0 0 30 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M15 7.5C15.5178 7.5 15.9375 7.91973 15.9375 8.4375V14.0625H21.5625C22.0803 14.0625 22.5 14.4822 22.5 15C22.5 15.5178 22.0803 15.9375 21.5625 15.9375H15.9375V21.5625C15.9375 22.0803 15.5178 22.5 15 22.5C14.4822 22.5 14.0625 22.0803 14.0625 21.5625V15.9375H8.4375C7.91973 15.9375 7.5 15.5178 7.5 15C7.5 14.4822 7.91973 14.0625 8.4375 14.0625H14.0625V8.4375C14.0625 7.91973 14.4822 7.5 15 7.5Z"
								fill="white"
							/>
						</svg>
					</Button>
				</div>
				<div className="navbar-third-elements">
					<Button type={"ghost"}>
						<svg
							width="29"
							height="30"
							viewBox="0 0 29 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12.7794 30C11.1322 30 9.74289 28.7728 9.53957 27.1381L9.42436 26.2119C9.34686 25.5888 8.92044 25.0781 8.38508 24.75C7.84993 24.4221 7.19119 24.3368 6.61299 24.581L5.81278 24.9189C4.26605 25.572 2.47508 24.9699 1.637 23.5151L0.446038 21.4477C-0.380806 20.0124 -0.012904 18.1863 1.30522 17.1831L2.4396 16.3197C2.68885 16.13 2.80597 15.8202 2.80597 15.507V14.4945C2.80597 14.1804 2.68839 13.8696 2.43841 13.6794L1.30522 12.8169C-0.012904 11.8137 -0.380807 9.98764 0.446038 8.55231L1.63816 6.4829C2.47558 5.02921 4.26514 4.42761 5.81065 5.08023L6.59908 5.41316C7.18576 5.6609 7.8536 5.57208 8.40299 5.25C8.93813 4.93627 9.34574 4.42028 9.4223 3.80469L9.53503 2.89838C9.74094 1.24283 11.1479 0 12.8162 0H15.2206C16.8679 0 18.2571 1.22717 18.4604 2.86187L18.5755 3.78683C18.6531 4.41072 19.0799 4.92234 19.6164 5.25C20.1512 5.57655 20.8087 5.66324 21.3859 5.4195L22.1915 5.07933C23.7358 4.42722 25.5239 5.02835 26.3607 6.48089L27.554 8.55231C28.3808 9.98764 28.0129 11.8137 26.6948 12.8169L25.5616 13.6794C25.3116 13.8696 25.194 14.1804 25.194 14.4945V15.5055C25.194 15.8156 25.2817 16.1361 25.5285 16.3239L26.798 17.29C28.0358 18.2321 28.3812 19.9468 27.6048 21.2946L26.3138 23.5357C25.4831 24.9777 23.7063 25.572 22.1753 24.92L21.3997 24.5897C20.8141 24.3403 20.1462 24.4281 19.597 24.75C19.0619 25.0637 18.6543 25.5797 18.5777 26.1953L18.465 27.1016C18.2591 28.7572 16.8521 30 15.1838 30H12.7794ZM14.0746 20.25C15.5174 20.25 16.7488 19.7375 17.7687 18.7125C18.7886 17.6875 19.2985 16.45 19.2985 15C19.2985 13.55 18.7886 12.3125 17.7687 11.2875C16.7488 10.2625 15.5174 9.75 14.0746 9.75C12.607 9.75 11.3692 10.2625 10.3612 11.2875C9.35324 12.3125 8.84975 13.55 8.85075 15C8.85075 16.45 9.35473 17.6875 10.3627 18.7125C11.3706 19.7375 12.608 20.25 14.0746 20.25Z"
								fill="#00ADB5"
							/>
						</svg>
					</Button>
					<Button type={"ghost"} className="hide-in-s-dev">
						<svg
							width="23"
							height="27"
							viewBox="0 0 23 27"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M22.5 21.25V22.5H0V21.25L2.5 18.75V11.25C2.5 7.375 5.0375 3.9625 8.75 2.8625V2.5C8.75 1.83696 9.01339 1.20107 9.48223 0.732233C9.95107 0.263392 10.587 0 11.25 0C11.913 0 12.5489 0.263392 13.0178 0.732233C13.4866 1.20107 13.75 1.83696 13.75 2.5V2.8625C17.4625 3.9625 20 7.375 20 11.25V18.75L22.5 21.25ZM13.75 23.75C13.75 24.413 13.4866 25.0489 13.0178 25.5178C12.5489 25.9866 11.913 26.25 11.25 26.25C10.587 26.25 9.95107 25.9866 9.48223 25.5178C9.01339 25.0489 8.75 24.413 8.75 23.75"
								fill="#00ADB5"
							/>
						</svg>
					</Button>
					<div>
						<Profile userDetail={userData}></Profile>
					</div>

					{plusPopup ? (
						<div className="dashboard-popup-box">
							<div
								className="dashboard-popup-box-todo-list"
								onClick={() => {
									router.push("?s=todo");
								}}>
								<div className="dashboard-popup-box-todo-list-svg">
									<svg
										width="66"
										height="66"
										viewBox="0 0 66 66"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M0 20C0 8.9543 8.9543 0 20 0H45.9531C56.9988 0 65.9531 8.9543 65.9531 20V45.9531C65.9531 56.9988 56.9988 65.9531 45.9531 65.9531H20C8.9543 65.9531 0 56.9988 0 45.9531V20Z"
											fill="#98EE64"
											fill-opacity="0.3"
										/>
										<path
											d="M28.1984 29.0031C28.1984 28.791 28.2827 28.5875 28.4328 28.4374C28.5828 28.2874 28.7863 28.2031 28.9984 28.2031H36.9984C37.2106 28.2031 37.4141 28.2874 37.5641 28.4374C37.7142 28.5875 37.7984 28.791 37.7984 29.0031C37.7984 29.2153 37.7142 29.4188 37.5641 29.5688C37.4141 29.7188 37.2106 29.8031 36.9984 29.8031H28.9984C28.7863 29.8031 28.5828 29.7188 28.4328 29.5688C28.2827 29.4188 28.1984 29.2153 28.1984 29.0031ZM28.9984 33.0031C28.7863 33.0031 28.5828 33.0874 28.4328 33.2374C28.2827 33.3875 28.1984 33.591 28.1984 33.8031C28.1984 34.0153 28.2827 34.2188 28.4328 34.3688C28.5828 34.5188 28.7863 34.6031 28.9984 34.6031H36.9984C37.2106 34.6031 37.4141 34.5188 37.5641 34.3688C37.7142 34.2188 37.7984 34.0153 37.7984 33.8031C37.7984 33.591 37.7142 33.3875 37.5641 33.2374C37.4141 33.0874 37.2106 33.0031 36.9984 33.0031H28.9984ZM28.1984 38.6031C28.1984 38.391 28.2827 38.1875 28.4328 38.0374C28.5828 37.8874 28.7863 37.8031 28.9984 37.8031H32.1984C32.4106 37.8031 32.6141 37.8874 32.7641 38.0374C32.9142 38.1875 32.9984 38.391 32.9984 38.6031C32.9984 38.8153 32.9142 39.0188 32.7641 39.1688C32.6141 39.3188 32.4106 39.4031 32.1984 39.4031H28.9984C28.7863 39.4031 28.5828 39.3188 28.4328 39.1688C28.2827 39.0188 28.1984 38.8153 28.1984 38.6031ZM26.5984 21.0031C26.5984 20.791 26.6827 20.5875 26.8328 20.4374C26.9828 20.2874 27.1863 20.2031 27.3984 20.2031C27.6106 20.2031 27.8141 20.2874 27.9641 20.4374C28.1142 20.5875 28.1984 20.791 28.1984 21.0031V21.8031H32.1984V21.0031C32.1984 20.791 32.2827 20.5875 32.4328 20.4374C32.5828 20.2874 32.7863 20.2031 32.9984 20.2031C33.2106 20.2031 33.4141 20.2874 33.5641 20.4374C33.7142 20.5875 33.7984 20.791 33.7984 21.0031V21.8031H37.7984V21.0031C37.7984 20.791 37.8827 20.5875 38.0328 20.4374C38.1828 20.2874 38.3863 20.2031 38.5984 20.2031C38.8106 20.2031 39.0141 20.2874 39.1641 20.4374C39.3142 20.5875 39.3984 20.791 39.3984 21.0031V21.8031H40.1984C40.835 21.8031 41.4454 22.056 41.8955 22.5061C42.3456 22.9562 42.5984 23.5666 42.5984 24.2031V31.7743C42.0768 31.9983 41.5872 32.3215 41.1616 32.7487L40.9984 32.9119V24.2031C40.9984 23.991 40.9142 23.7875 40.7641 23.6374C40.6141 23.4874 40.4106 23.4031 40.1984 23.4031H25.7984C25.5863 23.4031 25.3828 23.4874 25.2328 23.6374C25.0827 23.7875 24.9984 23.991 24.9984 24.2031V43.4031C24.9984 43.6153 25.0827 43.8188 25.2328 43.9688C25.3828 44.1188 25.5863 44.2031 25.7984 44.2031H31.7504L31.4896 45.2479C31.4441 45.43 31.4152 45.6158 31.4032 45.8031H25.7984C25.1619 45.8031 24.5515 45.5503 24.1014 45.1002C23.6513 44.6501 23.3984 44.0396 23.3984 43.4031V24.2031C23.3984 23.5666 23.6513 22.9562 24.1014 22.5061C24.5515 22.056 25.1619 21.8031 25.7984 21.8031H26.5984V21.0031ZM42.2944 33.8799L34.5664 41.6079C34.116 42.0581 33.7964 42.6222 33.6416 43.2399L33.0416 45.6367C32.9825 45.8751 32.986 46.1247 33.0518 46.3614C33.1176 46.598 33.2435 46.8136 33.4172 46.9872C33.591 47.1608 33.8067 47.2865 34.0434 47.3521C34.2801 47.4177 34.5297 47.4209 34.768 47.3615L37.1648 46.7631C37.7827 46.6086 38.3468 46.2889 38.7968 45.8383L46.5248 38.1103C47.0787 37.5476 47.3876 36.7889 47.3844 35.9994C47.3812 35.2099 47.0661 34.4536 46.5077 33.8954C45.9493 33.3373 45.193 33.0224 44.4035 33.0195C43.614 33.0166 42.8553 33.3259 42.2928 33.8799"
											fill="#4ECB71"
										/>
									</svg>
								</div>
								<div className="dashboard-popup-box-todo-heading">
									Todo List
								</div>
							</div>
							<div
								className="dashboard-popup-box-meditation"
								onClick={() => {
									router.push("?s=meditate");
								}}>
								<div className="dashboard-popup-box-todo-list-svg">
									<svg
										width="66"
										height="66"
										viewBox="0 0 66 66"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<rect
											width="65.636"
											height="65.5164"
											rx="20"
											fill="#B50000"
											fill-opacity="0.3"
										/>
										<path
											d="M33.4082 27.4074C35.0489 27.4074 36.379 26.092 36.379 24.4693C36.379 22.8467 35.0489 21.5312 33.4082 21.5312C31.7675 21.5312 30.4375 22.8467 30.4375 24.4693C30.4375 26.092 31.7675 27.4074 33.4082 27.4074Z"
											fill="#B50000"
										/>
										<path
											d="M44.4574 38.0623C44.4192 38.0057 44.3715 37.9584 44.3237 37.9112L40.9518 34.8125L38.7739 30.1834C38.1816 29.0025 37.3219 28.2656 36.0419 28.2656H30.5494C29.2599 28.2656 28.4097 29.0025 27.8175 30.1834L25.6396 34.8125L22.2676 37.9112C22.2199 37.9584 22.1721 38.0151 22.1339 38.0623C21.79 38.3552 21.5703 38.7898 21.5703 39.2716C21.5703 40.1502 22.2963 40.8682 23.1846 40.8682C23.71 40.8682 24.1685 40.6225 24.4646 40.2352C24.4933 40.2163 24.5219 40.188 24.5411 40.1691L28.1136 36.8814C28.2473 36.7492 28.3524 36.598 28.4288 36.428L29.5655 34.019L29.5082 38.2702L24.522 40.9532C23.6145 41.4444 23.1846 42.5025 23.5094 43.4756C23.8342 44.4486 24.8085 45.0533 25.8306 44.9115L33.2909 43.0032L40.7512 44.9115C41.7733 45.0533 42.7571 44.4486 43.0724 43.4756C43.3971 42.5025 42.9673 41.4444 42.0598 40.9532L37.0736 38.2607L37.0163 34.0095L38.153 36.4185C38.2294 36.5886 38.344 36.7397 38.4682 36.872L42.0407 40.1596C42.0694 40.188 42.0885 40.2069 42.1171 40.2257C42.4133 40.6036 42.8718 40.8587 43.3971 40.8587C44.2855 40.8587 45.0115 40.1407 45.0115 39.2621C45.021 38.7803 44.8013 38.3552 44.4574 38.0623Z"
											fill="#B50000"
										/>
									</svg>
								</div>
								<div className="dashboard-popup-box-todo-heading">
									Meditation
								</div>
							</div>
							<div
								className="dashboard-popup-box-journal"
								onClick={() => {
									router.push("?s=todo");
								}}>
								<div className="dashboard-popup-box-todo-list-svg">
									<svg
										width="66"
										height="66"
										viewBox="0 0 66 66"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<rect
											width="65.9531"
											height="65.9531"
											rx="20"
											fill="#EEB664"
											fill-opacity="0.3"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M21.6797 22.4158C21.6797 22.0092 22.0092 21.6797 22.4158 21.6797H25.3601C25.7666 21.6797 26.0962 22.0092 26.0962 22.4158C26.0962 22.8223 25.7666 23.1519 25.3601 23.1519H22.4158C22.0092 23.1519 21.6797 22.8223 21.6797 22.4158ZM27.5684 22.4158C27.5684 22.0092 27.8979 21.6797 28.3044 21.6797H43.0261C43.4327 21.6797 43.7622 22.0092 43.7622 22.4158C43.7622 22.8223 43.4327 23.1519 43.0261 23.1519H28.3044C27.8979 23.1519 27.5684 22.8223 27.5684 22.4158ZM21.6797 25.3601C21.6797 24.9536 22.0092 24.624 22.4158 24.624H25.3601C25.7666 24.624 26.0962 24.9536 26.0962 25.3601C26.0962 25.7666 25.7666 26.0962 25.3601 26.0962H22.4158C22.0092 26.0962 21.6797 25.7666 21.6797 25.3601ZM27.5684 25.3601C27.5684 24.9536 27.8979 24.624 28.3044 24.624H41.554C41.9605 24.624 42.29 24.9536 42.29 25.3601C42.29 25.7666 41.9605 26.0962 41.554 26.0962H28.3044C27.8979 26.0962 27.5684 25.7666 27.5684 25.3601ZM21.6797 28.3044C21.6797 27.8979 22.0092 27.5684 22.4158 27.5684H25.3601C25.7666 27.5684 26.0962 27.8979 26.0962 28.3044C26.0962 28.711 25.7666 29.0405 25.3601 29.0405H22.4158C22.0092 29.0405 21.6797 28.711 21.6797 28.3044ZM27.5684 28.3044C27.5684 27.8979 27.8979 27.5684 28.3044 27.5684H44.4983C44.9048 27.5684 45.2344 27.8979 45.2344 28.3044C45.2344 28.711 44.9048 29.0405 44.4983 29.0405H28.3044C27.8979 29.0405 27.5684 28.711 27.5684 28.3044ZM21.6797 31.2488C21.6797 30.8423 22.0092 30.5127 22.4158 30.5127H25.3601C25.7666 30.5127 26.0962 30.8423 26.0962 31.2488C26.0962 31.6553 25.7666 31.9849 25.3601 31.9849H22.4158C22.0092 31.9849 21.6797 31.6553 21.6797 31.2488ZM27.5684 31.2488C27.5684 30.8423 27.8979 30.5127 28.3044 30.5127H40.0818C40.4883 30.5127 40.8179 30.8423 40.8179 31.2488C40.8179 31.6553 40.4883 31.9849 40.0818 31.9849H28.3044C27.8979 31.9849 27.5684 31.6553 27.5684 31.2488ZM21.6797 34.1931C21.6797 33.7866 22.0092 33.457 22.4158 33.457H25.3601C25.7666 33.457 26.0962 33.7866 26.0962 34.1931C26.0962 34.5996 25.7666 34.9292 25.3601 34.9292H22.4158C22.0092 34.9292 21.6797 34.5996 21.6797 34.1931ZM27.5684 34.1931C27.5684 33.7866 27.8979 33.457 28.3044 33.457H40.0818C40.4883 33.457 40.8179 33.7866 40.8179 34.1931C40.8179 34.5996 40.4883 34.9292 40.0818 34.9292H28.3044C27.8979 34.9292 27.5684 34.5996 27.5684 34.1931ZM21.6797 37.1375C21.6797 36.7309 22.0092 36.4014 22.4158 36.4014H25.3601C25.7666 36.4014 26.0962 36.7309 26.0962 37.1375C26.0962 37.544 25.7666 37.8735 25.3601 37.8735H22.4158C22.0092 37.8735 21.6797 37.544 21.6797 37.1375ZM27.5684 37.1375C27.5684 36.7309 27.8979 36.4014 28.3044 36.4014H43.0261C43.4327 36.4014 43.7622 36.7309 43.7622 37.1375C43.7622 37.544 43.4327 37.8735 43.0261 37.8735H28.3044C27.8979 37.8735 27.5684 37.544 27.5684 37.1375ZM21.6797 40.0818C21.6797 39.6753 22.0092 39.3457 22.4158 39.3457H25.3601C25.7666 39.3457 26.0962 39.6753 26.0962 40.0818C26.0962 40.4883 25.7666 40.8179 25.3601 40.8179H22.4158C22.0092 40.8179 21.6797 40.4883 21.6797 40.0818ZM27.5684 40.0818C27.5684 39.6753 27.8979 39.3457 28.3044 39.3457H37.1375C37.544 39.3457 37.8735 39.6753 37.8735 40.0818C37.8735 40.4883 37.544 40.8179 37.1375 40.8179H28.3044C27.8979 40.8179 27.5684 40.4883 27.5684 40.0818ZM21.6797 43.0261C21.6797 42.6196 22.0092 42.29 22.4158 42.29H25.3601C25.7666 42.29 26.0962 42.6196 26.0962 43.0261C26.0962 43.4327 25.7666 43.7622 25.3601 43.7622H22.4158C22.0092 43.7622 21.6797 43.4327 21.6797 43.0261ZM27.5684 43.0261C27.5684 42.6196 27.8979 42.29 28.3044 42.29H44.4983C44.9048 42.29 45.2344 42.6196 45.2344 43.0261C45.2344 43.4327 44.9048 43.7622 44.4983 43.7622H28.3044C27.8979 43.7622 27.5684 43.4327 27.5684 43.0261Z"
											fill="#EEB664"
										/>
									</svg>
								</div>
								<div className="dashboard-popup-box-todo-heading">
									Journal
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</>
	);
};

export default Navbar;
