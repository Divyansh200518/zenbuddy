"use client";

import {
	signin,
	signup,
	logout,
	checkAuthentication,
	signInwithGoogle,
	emailChecker,
} from "../../utils/helper";
import { useRouter } from "next/navigation";
import Button from "../../../components/ui/Button.jsx";
import React, { useEffect, useState, useRef, use } from "react";
import { color, delay, motion, useAnimation } from "framer-motion";
import "../../../styles/login.css";
import { borel, roboto } from "../../fonts.js";
import { useNotification } from "../../../components/ui/NotificationProvider.jsx";

const Login = () => {
	const router = useRouter();
	const { alertMessage } = useNotification();
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const [passwordLevel, setPasswordLevel] = useState({
		color: "rgb(140, 140, 140)",
		level: 0,
		text: "Strength",
	});

	const [authMode, setAuthMode] = useState("register");
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const controls = useAnimation();
	const [screen, setScreen] = useState("emailContainer");

	const emailInput = useRef(null);
	const passwordInput = useRef(null);

	const visible = {
		height: "40px",
		width: "60%",
		background: passwordLevel.color,
	};
	const invisible = {
		height: "30px",
		width: "30%",
		background: passwordLevel.color,
	};

	// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
	useEffect(() => {
		const authCheckerFunc = async () => {
			var sessionCookie = localStorage.getItem("sessionCookie") || "";
			if (sessionCookie) {
				alertMessage("Checking if logged in");
				var response = await checkAuthentication(sessionCookie);
				if (response.status) {
					setIsUserLoggedIn(true);
				} else {
					setIsUserLoggedIn(false);
					alertMessage("Not Logged In");
				}
			}
		};
		authCheckerFunc();
		return async () => {
			// await authCheckerFunc();
		};
	}, []);

	async function authenticateWithGoogle() {
		setIsLoading(true);
		await signInwithGoogle();
		setIsLoading(false);
		var sessionCookie = localStorage.getItem("sessionCookie") || "";
		console.log({ sessionCookie });
		const res = await checkAuthentication(sessionCookie);
		setIsLoading(false);
		console.log({ res });
		if (!res.status) {
			alertMessage("Problems fetching data");
			return;
		}
		alertMessage("Successfully Logged In", 3000, "green");

		setIsUserLoggedIn(true);
		// setTimeout(() => {
		// }, 100);
	}
	async function authenticate() {
		if (authMode === "login") {
			console.log("login");
			setIsLoading(true);
			const res = await signin(credentials);
			console.log(res);
			if (!res.status) {
				alertMessage(res.error.code);
				setIsLoading(false);
				return;
			}
			setIsLoading(false);
			// moveWindow("authenticate");
		} else {
			if (
				credentials.email &&
				credentials.password &&
				passwordLevel.level >= 3
			) {
				console.log("register");
				setIsLoading(true);
				await signup(credentials);
				setIsLoading(false);
				// moveWindow("authenticate");
			} else {
				alertMessage("Password Change karle");
			}
		}

		var sessionCookie = localStorage.getItem("sessionCookie") || "";
		console.log({ sessionCookie });
		const res = await checkAuthentication(sessionCookie);
		setIsLoading(false);
		console.log({ res });
		if (!res.status) return;
		setIsUserLoggedIn(true);
		alertMessage("Successfully Logged In", 3000, "green");
	}

	useEffect(() => {
		const passwordStrength = checkPassword();
		if (passwordStrength == 0) {
			setPasswordLevel({
				color: "rgb(140, 140, 140)",
				level: 0,
				text: "Strength",
			});
		} else if (passwordStrength < 3) {
			setPasswordLevel({
				color: "Red",
				level: passwordStrength,
				text: "Weak",
			});
		} else if (passwordStrength == 3 || passwordStrength == 4) {
			setPasswordLevel({
				color: "Orange",
				level: passwordStrength,
				text: "Moderate",
			});
		} else if (passwordStrength == 5) {
			setPasswordLevel({
				color: "Green",
				level: passwordStrength,
				text: "Strong",
			});
		}
	}, [credentials.password]);

	function checkPassword() {
		var pwd = credentials.password;
		var digFound = false;
		var lvl = 0;
		var specialFound = false;
		if (pwd.length >= 8) {
			lvl++;
		}
		if (pwd !== pwd.toLowerCase()) {
			lvl++;
		}
		if (pwd !== pwd.toUpperCase()) {
			lvl++;
		}
		for (let index = 0; index < pwd.length; index++) {
			const letter = pwd[index];
			if (!digFound && "1234567890".includes(letter)) {
				digFound = true;
				lvl++;
			}
			if (!specialFound && "#_@$!".includes(letter)) {
				specialFound = true;
				lvl++;
			}
		}
		return lvl;
	}

	async function usernameChecker() {
		setIsLoading(true);
		const response = await emailChecker(credentials.email.toLowerCase());
		const data = await response.json();
		console.log({ data });
		// setAuthMode("login");
		setIsLoading(false);
		if (data.status === true) {
			if (data.statusCode === 2 && data.provider === "google") {
				alertMessage(
					"Please Login With Google Provider",
					5000,
					"#FFFF00"
				);
				return false;
			} else {
				setAuthMode("login");
				return true;
			}
		} else {
			setAuthMode("register");
			return true;
		}
	}

	async function handleKeyDown(event, type) {
		if (event.key === "Enter") {
			event.preventDefault();
			if (type === "authenticate") {
				authenticate();
			} else {
				moveWindow(type);
			}
		}
	}

	var windowMoveTimeout;

	async function moveWindow(type) {
		clearTimeout(windowMoveTimeout);
		// windowMoveTimeout = setTimeout(async () => {
		if (type === "emailContainer") {
			setScreen("emailContainer");
			windowMoveTimeout = setTimeout(() => {
				emailInput.current.focus();
			}, 100);
			windowMoveTimeout = setTimeout(() => {
				setAuthMode("register");
				setCredentials((prevItems) => ({ ...prevItems, password: "" }));
			}, 300);
		} else if (type === "passwordContainer") {
			if (credentials.email) {
				const res = await usernameChecker();
				if (res) {
					setScreen("passwordContainer");
					setTimeout(() => {
						passwordInput.current.focus();
					}, 100);
				}
			}
		} else if (type === "authenticate") {
			authenticate();
		}
		// }, 1);
	}

	useEffect(() => {
		if (isUserLoggedIn) {
			setScreen("authenticate");
			setTimeout(() => {
				document
					.querySelector(":root")
					.style.setProperty("--vignette-width", "0%");
				setTimeout(() => {
					document
						.querySelector(":root")
						.style.setProperty("--vignette-color", "#1e212d");
					setTimeout(() => {
						document
							.querySelector(":root")
							.style.setProperty("--vignette-width", "100%");
						setTimeout(() => {
							router.push("/dashboard");
						}, 100);
					}, 300);
				}, 300);
			}, 300);
		} else {
			setTimeout(() => {
				document
					.querySelector(":root")
					.style.setProperty(
						"--vignette-color",
						"linear-gradient(to right, black, rgba(0, 0, 0, 0))"
					);
				document
					.querySelector(":root")
					.style.setProperty("--vignette-width", "60%");
			}, 100);
		}
	}, [isUserLoggedIn]);

	return (
		<>
			<motion.div
				initial={{ backgroundPosition: "0" }}
				animate={
					screen === "emailContainer"
						? { backgroundPosition: "0%" }
						: screen === "passwordContainer"
						? { backgroundPosition: "30%" }
						: screen === "authenticate"
						? { backgroundPosition: "100%" }
						: { backgroundPosition: "0" }
				}
				transition={{ delay: 0, duration: 0.1 }}
				className="loginBackground">
				{/* <div  style={{height:"100px",width:"100px",background:"red",position:"absolute",top:0,left:"90%"}} ></div> */}
				<motion.div
					initial={{ display: "none" }}
					animate={
						screen !== "emailContainer" && screen !== "authenticate"
							? { display: "block" }
							: { display: "none" }
					}
					className="goBack"
					onClick={() => {
						moveWindow("emailContainer");
					}}>
					<svg
						width="20"
						height="23"
						viewBox="0 0 20 23"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M18.5716 10.0417H3.71648L11.2869 2.43854C11.4222 2.30898 11.53 2.15318 11.6036 1.98057C11.6772 1.80796 11.7152 1.62213 11.7152 1.43435C11.7152 1.24656 11.6772 1.06074 11.6036 0.888124C11.53 0.715511 11.4222 0.559707 11.2869 0.430153C11.1579 0.29422 11.0028 0.186005 10.8309 0.112065C10.659 0.0381249 10.474 0 10.287 0C10.1 0 9.91502 0.0381249 9.74315 0.112065C9.57128 0.186005 9.41615 0.29422 9.28715 0.430153L1.28823 8.46369C0.589667 9.1804 0.160527 10.1185 0.0741073 11.1176C0.0741073 11.2611 0.00268833 11.3328 0.00268833 11.4763C-0.00862605 11.6234 0.0158855 11.7711 0.0741073 11.9066C0.17484 12.902 0.601907 13.8355 1.28823 14.5606L9.28715 22.5941C9.55325 22.856 9.9115 23.0019 10.2841 23C10.6566 22.9981 11.0134 22.8486 11.2768 22.584C11.5403 22.3194 11.6891 21.9611 11.691 21.587C11.6929 21.2128 11.5477 20.853 11.2869 20.5857L3.78789 12.9108H18.5716C18.9504 12.9108 19.3138 12.7597 19.5816 12.4907C19.8495 12.2216 20 11.8567 20 11.4763C20 11.0958 19.8495 10.7309 19.5816 10.4619C19.3138 10.1929 18.9504 10.0417 18.5716 10.0417Z"
							fill="white"
						/>
					</svg>
				</motion.div>
				<form
					onSubmit={(event) => event.preventDefault()}
					// onsubmit="return false;"
					className="authForm">
					<motion.div
						initial={{ display: "flex", opacity: 0, x: 10 }}
						animate={
							screen === "emailContainer"
								? {
										display: "flex",
										opacity: 1,
										transform: "translateX(0)",
								  }
								: {
										opacity: 0,
										transform: "translateX(-800px)",
								  }
						}
						className="emailContainer">
						<div className={`${borel.className} welcomeText`}>
							Welcome
						</div>
						<div
							className={`${roboto.className} emailInputContainer`}>
							<input
								ref={emailInput}
								type="text"
								name="email"
								id="email"
								onKeyDown={(e) => {
									handleKeyDown(e, "passwordContainer");
								}}
								value={credentials.email}
								onChange={(e) => {
									setCredentials((prevItems) => ({
										...prevItems,
										email: e.target.value,
									}));
								}}
								required
								autoComplete="off"
							/>
							<label className={roboto.className} htmlFor="email">
								Email
							</label>
						</div>
						<Button
							buttonType="submit"
							className={"login-page-option-button"}
							style={{ color: "white" }}
							onClick={() => {
								moveWindow("passwordContainer");
							}}
							type={isLoading ? "blocked" : "fill"}>
							Enter
						</Button>
						<Button
							className={"login-page-option-button"}
							style={{
								color: "white",
								gap: "10px",
								borderColor: "white",
							}}
							type={isLoading ? "outline" : "outline"}
							onClick={() => authenticateWithGoogle()}>
							<svg
								width="24"
								height="24"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M15.5453 6.55847C15.6394 7.09345 15.6835 7.64019 15.6835 8.18399C15.6835 10.6179 14.8134 12.6755 13.2996 14.0688H13.3025C11.9768 15.2916 10.1573 16 7.99973 16C4.97503 16 2.209 14.2951 0.850974 11.5938C-0.283656 9.33331 -0.283659 6.67017 0.850972 4.40972C2.209 1.70542 4.97503 0.000539093 7.99973 0.000539093C9.98681 -0.0229766 11.9063 0.723645 13.3525 2.08167L11.0685 4.36563C10.2425 3.57786 9.14024 3.1487 7.99973 3.16633C5.91272 3.16633 4.14022 4.57433 3.50824 6.47028C3.17314 7.46382 3.17314 8.53966 3.50824 9.5332H3.51118C4.1461 11.4262 5.91566 12.8342 8.00267 12.8342C9.08145 12.8342 10.0074 12.5579 10.7246 12.0699H10.7217C11.5653 11.5115 12.1414 10.6326 12.3207 9.63902H7.99973V6.55847H15.5453Z"
									fill="white"
								/>
							</svg>
							<div>Sign In with Google</div>
						</Button>
					</motion.div>
					<motion.div
						initial={{
							display: "none",
							opacity: 0,
							transform: "translateX(1000px)",
						}}
						animate={
							screen === "passwordContainer"
								? {
										display: "flex",
										opacity: 1,
										transform: "translateX(0)",
								  }
								: screen === "authenticate"
								? {
										opacity: 0,
										transform: "translateX(-1000px)",
								  }
								: {
										opacity: 0,
										transform: "translateX(1000px)",
								  }
						}
						transition={{
							duration: 0.3,
							opacity:
								screen === "passwordContainer"
									? { delay: 0.1 }
									: { delay: 0 },
							x:
								screen === "passwordContainer"
									? { delay: 0.2 }
									: { delay: 0 },
							display:
								screen === "passwordContainer"
									? { delay: 0 }
									: { delay: 0.3 },
						}}
						className="passwordContainer">
						<div
							className={` ${borel.className} passwordContainerText`}>
							{authMode === "login"
								? `Welcome Back ${credentials.email}`
								: `Welcome ${credentials.email}`}
						</div>
						<div
							className={`${roboto.className} passwordInputContainer`}>
							<input
								type="password"
								id="password"
								autoComplete="off"
								ref={passwordInput}
								onKeyDown={(e) => {
									handleKeyDown(e, "authenticate");
								}}
								value={credentials.password}
								onChange={(e) => {
									setCredentials((prevItems) => ({
										...prevItems,
										password: e.target.value,
									}));
								}}
								required
							/>
							<label
								className={roboto.className}
								htmlFor="password">
								Password
							</label>
						</div>
						<Button
							style={{}}
							onClick={() => {
								authenticate();
							}}
							type={
								isLoading
									? "blocked"
									: authMode !== "login" &&
									  passwordLevel.level < 3
									? "hide"
									: "fill"
							}
							className={"login-page-option-button"}
							// disabled={authMode !== "login" && passwordLevel.level < 3 && true}
						>
							{authMode === "login" ? "Sign In" : "Sign Up"}
						</Button>

						<div
							className="passwordStrength"
							style={
								authMode === "login"
									? { display: "none" }
									: credentials.password
									? visible
									: invisible
							}>
							{passwordLevel.text}
						</div>
						<div
							className={`${roboto.className} passwordInstructions`}
							style={
								authMode === "login"
									? { display: "none" }
									: { display: "block" }
							}>
							<ul>
								<li>Password must contain Upper Letters</li>
								<li>Password must contain Lower Letters</li>
								<li>Password must contain Numbers</li>
								<li>Password must contain Special Character</li>
								<li>
									Password must have more than 8 characters in
									length
								</li>
							</ul>
						</div>
					</motion.div>
				</form>
			</motion.div>
		</>
	);
};

export default Login;
