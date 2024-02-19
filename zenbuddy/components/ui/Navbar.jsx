"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "../../components/ui/Button.jsx";
import { useState } from "react";
import { motion, AnimatePresence, animate, useAnimation } from "framer-motion";
import "../navbar.css";
const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const controls = useAnimation();

	const router = useRouter();

	const goToAuth = () => {
		router.push("/login");
	};

	const handleMenuOpen = async () => {
		setIsMenuOpen((prev) => !prev);
		await controls.start(
			isMenuOpen ? { x: "100%", width: "0" } : { x: 0, width: "100dvw" }
		);
	};

	return (
		<div>
			<div className="lp-navbar">
				<div className="lp-navbar-logo-container">
					<div className="lp-navbar-logo">
						<svg
							width="60"
							height="60"
							viewBox="0 0 60 60"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M43.2526 56.904C26.5437 65.3089 5.74397 55.8323 1.01658 37.7568C-3.04333 22.2334 5.36157 6.36503 20.7967 1.49233C39.4703 -4.40269 57.2361 7.88367 59.6943 25.7498C61.5114 38.9568 55.1261 50.9157 43.2526 56.904Z"
								fill="#00ADB5"
							/>
							<path
								d="M17.3364 44.9059C14.1709 44.8299 14.0465 45.6193 14.0837 41.836C14.101 40.0752 14.1637 38.3099 14.0677 36.5541C13.8527 32.6201 16.3057 28.626 21.1732 28.4558C27.2107 28.2446 33.2699 28.0662 39.2965 28.5558C43.3681 28.8866 45.7419 31.5615 45.9446 35.614C46.0727 38.1736 45.9639 40.7446 45.9782 43.3103C45.9848 44.4914 45.5293 44.966 44.2503 44.9368C40.4717 44.8507 36.6892 44.8636 32.9096 44.9259C31.6481 44.9467 31.2062 44.5077 31.2446 43.2646C31.313 41.0529 31.2254 38.8367 31.282 36.6244C31.3065 35.6674 30.9229 35.434 30.0388 35.4368C29.1685 35.4395 28.7563 35.6441 28.7811 36.6126C28.8378 38.825 28.7556 41.041 28.8202 43.2529C28.856 44.4808 28.4371 44.9539 27.1624 44.9267C23.9378 44.8581 20.7107 44.9052 17.3364 44.9059Z"
								fill="#FCF8F3"
							/>
							<path
								d="M44.0463 23.7611C42.5041 26.3766 40.3 27.5706 37.4163 27.0104C35.0052 26.542 33.4376 24.926 32.7823 22.5641C32.0987 20.1006 33.1113 17.532 35.2038 16.0933C37.1707 14.741 40.2244 14.7635 42.1602 16.1447C44.1939 17.5957 45.1162 20.196 44.4629 22.6747C44.3742 23.0116 44.2217 23.3316 44.0463 23.7611Z"
								fill="#FCF9F4"
							/>
							<path
								d="M26.9113 23.5935C24.9863 26.8123 22.0263 27.9432 19.0541 26.678C16.3051 25.5079 14.8044 22.3468 15.6058 19.4146C16.495 16.161 20.0304 14.3394 23.4082 15.3928C26.2141 16.2678 28.5776 19.814 26.9113 23.5935Z"
								fill="#FCF9F5"
							/>
							<path
								d="M28.8698 30.3644C32.1895 30.3666 35.3647 30.3451 38.5393 30.3768C41.7708 30.4091 43.9091 32.5366 43.9789 35.7846C44.0221 37.7957 43.9569 39.8093 44.0088 41.82C44.0319 42.711 43.7733 43.0745 42.8243 43.0576C40.0534 43.008 37.2801 42.9958 34.5097 43.0584C33.4489 43.0823 33.254 42.6342 33.2745 41.7122C33.3234 39.5 33.2691 37.2858 33.2995 35.073C33.3151 33.9358 32.8509 33.3648 31.6807 33.4462C31.5805 33.4532 31.4749 33.4265 31.3791 33.4478C28.9025 33.9981 27.6599 32.6152 26.8203 30.5352C27.4369 30.2098 28.0965 30.4299 28.8698 30.3644Z"
								fill="#00ADB5"
							/>
							<path
								d="M25.143 43.0397C22.4273 43.0397 19.8572 43.0096 17.2884 43.0557C16.3884 43.0719 16.0292 42.8125 16.0561 41.8662C16.1161 39.7558 16.0353 37.6414 16.0963 35.531C16.1809 32.6032 18.4504 30.4039 21.3251 30.3753C24.3352 30.3453 26.6382 32.4805 26.7413 35.4917C26.8117 37.5512 26.6951 39.618 26.7957 41.6751C26.855 42.8894 26.3377 43.1856 25.143 43.0397Z"
								fill="#00ADB5"
							/>
							<path
								d="M40.8876 17.6627C43.0574 19.5423 43.3622 22.0542 41.7234 23.766C39.8997 25.6709 37.3026 25.6417 35.5032 23.696C34.2954 22.3901 34.201 20.1942 35.2887 18.7056C36.5575 16.9691 38.5495 16.5702 40.8876 17.6627Z"
								fill="#00ADB5"
							/>
							<path
								d="M17.7698 19.167C19.1766 17.2489 20.7241 16.6377 22.64 17.1661C24.1838 17.5919 25.352 19.0547 25.4979 20.6754C25.6601 22.478 24.9104 23.8124 23.3694 24.6542C21.9434 25.4332 20.47 25.3887 19.1041 24.4458C17.6355 23.4321 17.0922 22.0036 17.3782 20.2622C17.4341 19.9218 17.5967 19.5988 17.7698 19.167Z"
								fill="#00ADB5"
							/>
						</svg>
					</div>
					<a href="/" className="lp-navbar-name">
						ZenBuddy
					</a>
				</div>
				<div className="lp-navbar-navigation-container">
					<div className="lp-navbar-navigation">Home</div>
					<div className="lp-navbar-navigation">Contact Us</div>
					<div className="lp-navbar-navigation">About</div>
					<div className="lp-navbar-navigation">Help</div>
					{/* <Button className="lp-navbar-navigation">Log In</Button> */}
				</div>
				<div className="lp-navbar-navigation-container">
					<Button
						onClick={() => {
							goToAuth();
						}}
						type={"fill"}
						style={{ borderRadius: "10px", color: "white" }}>
						JOIN US
					</Button>
				</div>
				<div className="lp-navbar-hamburger-menu-container">
					<Button
						type={"fill"}
						style={{ borderRadius: "10px", color: "white" }}>
						JOIN US
					</Button>
					<div
						className="lp-navbar-hamburger-menu"
						onClick={handleMenuOpen}>
						<svg
							viewBox="0 0 61 61"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.2969 15.3843H50.2969M10.2969 30.3843H35.2969M10.2969 45.3843H22.7969"
								strokeWidth="5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>

			<motion.div
				animate={controls}
				initial={{ x: "100%", width: "0" }}
				transition={{
					delay: isMenuOpen ? 0.3 : 0,
					stiffness: 120,
					staggerChildren: 0.07,
					delayChildren: 0.2,
				}}
				className="lp-mobile-navbar-conatiner">
				<div
					className="lp-mobile-navbar-container-cross"
					onClick={handleMenuOpen}>
					<motion.svg
						initial={{ height: "0", width: "0", opacity: 0 }}
						animate={{
							height: isMenuOpen ? "40px" : 0,
							width: isMenuOpen ? "40px" : 0,
							opacity: 1,
						}}
						transition={{
							delay: isMenuOpen ? 0.1 : 0,
							duration: 0.2,
						}}
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M4.64645 4.64645C4.84171 4.45118 5.15829 4.45118 5.35355 4.64645L8 7.29289L10.6464 4.64645C10.8417 4.45118 11.1583 4.45118 11.3536 4.64645C11.5488 4.84171 11.5488 5.15829 11.3536 5.35355L8.70711 8L11.3536 10.6464C11.5488 10.8417 11.5488 11.1583 11.3536 11.3536C11.1583 11.5488 10.8417 11.5488 10.6464 11.3536L8 8.70711L5.35355 11.3536C5.15829 11.5488 4.84171 11.5488 4.64645 11.3536C4.45118 11.1583 4.45118 10.8417 4.64645 10.6464L7.29289 8L4.64645 5.35355C4.45118 5.15829 4.45118 4.84171 4.64645 4.64645Z"
							fill="var(--textColor)"
						/>
					</motion.svg>
				</div>
				<div className="lp-mobile-navbar-inner-container">
					<motion.a
						href="/"
						initial={{ fontSize: "20px", opacity: 0 }}
						animate={{
							fontSize: isMenuOpen ? "40px" : 0,
							opacity: 1,
						}}
						transition={{
							delay: isMenuOpen ? 0.1 : 0,
							duration: 0.2,
						}}>
						Home
					</motion.a>
					<motion.a
						href="/"
						initial={{ fontSize: "20px", opacity: 0 }}
						animate={{
							fontSize: isMenuOpen ? "40px" : 0,
							opacity: 1,
						}}
						transition={{
							delay: isMenuOpen ? 0.1 : 0,
							duration: 0.2,
						}}>
						Contact Us
					</motion.a>
					<motion.a
						href="/"
						initial={{ fontSize: "20px", opacity: 0 }}
						animate={{
							fontSize: isMenuOpen ? "40px" : 0,
							opacity: 1,
						}}
						transition={{
							delay: isMenuOpen ? 0.1 : 0,
							duration: 0.2,
						}}>
						About
					</motion.a>
					<motion.a
						href="/"
						initial={{ fontSize: "20px", opacity: 0 }}
						animate={{
							fontSize: isMenuOpen ? "40px" : 0,
							opacity: 1,
						}}
						transition={{
							delay: isMenuOpen ? 0.1 : 0,
							duration: 0.2,
						}}>
						Help
					</motion.a>
				</div>
			</motion.div>
		</div>
	);
};

export default Navbar;
