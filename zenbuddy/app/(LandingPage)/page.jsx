"use client";

import React from "react";
import Button from "../../components/ui/Button.jsx";
import Profile from "../../components/ui/Profile.jsx";
import Navbar from "../../components/ui/Navbar.jsx";
import Input from "../../components/ui/Input.jsx";
import { motion, AnimatePresence, animate, useAnimation } from "framer-motion";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import profilePic from "../../images/firstScroll.png";
import secondScrollFirstPic from "../../images/secondScrollFirst.png";
import secondScrollSecondPic from "../../images/secondScrollSecond.png";
import secondScrollThirdPic from "../../images/secondScrollThird.png";
import secondScrollFourthPic from "../../images/secondScrollFourth.png";
import secondScrollFifthPic from "../../images/secondScrollFifth.png";
import secondScrollSixthPic from "../../images/secondScrollSixth.png";
import thirdScrollFirstPic from "../../images/puzzleBrain.png";
import thirdScreenSecondImage from "../../images/thirdScreenSecondImage.png";
import thirdScreenThirdImage from "../../images/thirdScreenThirdImage.png";
// import fifthScroll from "../../images/fifthScroll.png";
import fifthScrollPhone from "../../images/fifthScrollPhone.png";
import sixthScrollDoctors from "../../images/doctors.png";
import { useRouter } from "next/navigation";
import { useNotification } from "../../components/ui/NotificationProvider.jsx";

const LandingPage = () => {
	const router = useRouter();
	const { alertMessage } = useNotification();

	const goToAuth = () => {
		router.push("/login");
	};
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>

			<div className="first-scroll">
				<Navbar></Navbar>
				<div className="lp-main-introduction-outer-wrapper">
					<div className="lp-main-introduction-wrapper">
						<div className="lp-main-heading">
							TAKING CARE OF YOUR MENTAL HEATLH IS OUR FIRST
							PRIORITY
						</div>
						<div className="lp-main-introductory-lines">
							Unlock a world of possibilities through meaningful
							connections. A trusted companion can serve as the
							ideal collaborator to share and cherish life&apos;s
							precious moments. Join us and discover a network of
							potential partners to elevate your experiences
							together.
						</div>
						<Button
							className="lp-option-button"
							onClick={() => {
								goToAuth();
							}}
							style={{
								textTransform: "uppercase",
								color: "white",
								borderRadius: "10px",
							}}
							type={"fill"}>
							Find Your Zenbuddy
						</Button>
					</div>
				</div>
				<Image
					className="lp-main-introductory-image"
					src={profilePic}
					width={600}
					height={300}
					alt="guys"
				/>
			</div>
			<div className="second-scroll">
				<div className="lp-second-scroll-heading-container">
					<div className="lp-second-scroll-heading">Our Services</div>
					<div className="lp-second-scroll-sub-heading">
						Elevating Minds: Comprehensive Mental Health Services
						Tailored for You.
					</div>
				</div>
				<div className="lp-second-scroll-cards-outer-container">
					<div className="lp-second-scroll-card-wrapper">
						<Image
							className="lp-second-scroll-card-image"
							src={secondScrollFirstPic}
							width={600}
							height={300}
							alt="guys"
						/>

						{/* <div className="lp-second-scroll-card-image"></div> */}
						<div className="lp-second-scroll-card-heading">
							Brain Stimulation
						</div>
						<div className="lp-second-scroll-card-lines">
							Elevating mental health through targeted brain
							stimulation interventions.
						</div>
					</div>
					<div className="lp-second-scroll-card-wrapper">
						<Image
							className="lp-second-scroll-card-image"
							src={secondScrollSecondPic}
							width={600}
							height={300}
							alt="guys"
						/>

						{/* <div className="lp-second-scroll-card-image"></div> */}
						<div className="lp-second-scroll-card-heading">
							Brain Stimulation
						</div>
						<div className="lp-second-scroll-card-lines">
							Elevating mental health through targeted brain
							stimulation interventions.
						</div>
					</div>
					<div className="lp-second-scroll-card-wrapper">
						<Image
							className="lp-second-scroll-card-image"
							src={secondScrollThirdPic}
							width={600}
							height={300}
							alt="guys"
						/>

						{/* <div className="lp-second-scroll-card-image"></div> */}
						<div className="lp-second-scroll-card-heading">
							Brain Stimulation
						</div>
						<div className="lp-second-scroll-card-lines">
							Elevating mental health through targeted brain
							stimulation interventions.
						</div>
					</div>
					<div className="lp-second-scroll-card-wrapper">
						<Image
							className="lp-second-scroll-card-image"
							src={secondScrollFourthPic}
							width={600}
							height={300}
							alt="guys"
						/>

						{/* <div className="lp-second-scroll-card-image"></div> */}
						<div className="lp-second-scroll-card-heading">
							Brain Stimulation
						</div>
						<div className="lp-second-scroll-card-lines">
							Elevating mental health through targeted brain
							stimulation interventions.
						</div>
					</div>
					<div className="lp-second-scroll-card-wrapper">
						<Image
							className="lp-second-scroll-card-image"
							src={secondScrollFifthPic}
							width={600}
							height={300}
							alt="guys"
						/>

						{/* <div className="lp-second-scroll-card-image"></div> */}
						<div className="lp-second-scroll-card-heading">
							Brain Stimulation
						</div>
						<div className="lp-second-scroll-card-lines">
							Elevating mental health through targeted brain
							stimulation interventions.
						</div>
					</div>
					<div className="lp-second-scroll-card-wrapper">
						<Image
							className="lp-second-scroll-card-image"
							src={secondScrollSixthPic}
							width={600}
							height={300}
							alt="guys"
						/>

						{/* <div className="lp-second-scroll-card-image"></div> */}
						<div className="lp-second-scroll-card-heading">
							Brain Stimulation
						</div>
						<div className="lp-second-scroll-card-lines">
							Elevating mental health through targeted brain
							stimulation interventions.
						</div>
					</div>
				</div>
			</div>
			<div className="third-scroll">
				<div className="lp-third-scroll-inner-container">
					<div className="lp-third-scroll-heading">
						HOW MAY WE ASSIST IN ENHANCING YOUR WELL-BEING
					</div>
					<div className="lp-third-scroll-cards-container">
						<div className="lp-third-scroll-card-wrapper">
							<div className="lp-third-scoll-card-image-container">
								<Image
									className="lp-third-scroll-card-image"
									src={thirdScrollFirstPic}
									width={"100%"}
									height={"300"}
									alt="guys"
								/>
							</div>
							<div className="lp-third-scroll-card-lines">
								Evaluating and understanding your mental health
								conditions
							</div>
						</div>
						<div className="lp-third-scroll-card-wrapper">
							<div className="lp-third-scoll-card-image-container">
								<Image
									className="lp-third-scroll-card-image"
									src={thirdScreenSecondImage}
									width={"0"}
									height={"0"}
									alt="guys"
								/>
							</div>
							<div className="lp-third-scroll-card-lines">
								Providing you with evidence-based remedies to
								support your mental health and well-being.
							</div>
						</div>
						<div className="lp-third-scroll-card-wrapper">
							<div className="lp-third-scoll-card-image-container">
								<Image
									className="lp-third-scroll-card-image"
									src={thirdScreenThirdImage}
									width={"100%"}
									height={"300"}
									alt="guys"
								/>
							</div>
							<div className="lp-third-scroll-card-lines">
								Evaluating and understanding your mental health
								conditions
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="fifth-scroll">
				<div className="lp-fifth-scroll-heading-container">
					<div className="lp-fifth-scroll-heading">
						Why should you take our Services
					</div>
					<div className="lp-fifth-scroll-lines">
						Experience unparalleled expertise and personalized
						solutions tailored to meet your unique needs, ensuring
						exceptional value and success with our services.
					</div>
				</div>
				<div className="lp-fifth-scroll-content-container">
					<div className="lp-fifth-scroll-content-left-container">
						{/* <Image
							className="lp-fifth-scroll-content-left-image"
							src={fifthScroll}
							width={"100%"}
							height={"100%"}
							alt="guys"
						/> */}
						<Image
							className="lp-fifth-scroll-content-left-image"
							src={fifthScrollPhone}
							width={"100%"}
							height={"100%"}
							alt="guys"
						/>
					</div>

					<div className="lp-fifth-scroll-content-right-container">
						<div className="lp-fifth-scroll-content">
							<div className="lp-fifth-scroll-content-heading">
								Expertise & Experience
								<svg
									width="23"
									height="24"
									viewBox="0 0 23 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<g clipPath="url(#clip0_448_223)">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M0 12C0 8.8174 1.2116 5.76516 3.36827 3.51472C5.52494 1.26428 8.45001 0 11.5 0C14.55 0 17.4751 1.26428 19.6317 3.51472C21.7884 5.76516 23 8.8174 23 12C23 15.1826 21.7884 18.2348 19.6317 20.4853C17.4751 22.7357 14.55 24 11.5 24C8.45001 24 5.52494 22.7357 3.36827 20.4853C1.2116 18.2348 0 15.1826 0 12ZM10.8437 17.136L17.4647 8.4992L16.2687 7.5008L10.6229 14.8624L6.624 11.3856L5.64267 12.6144L10.8437 17.136Z"
											fill="#00ADB5"
										/>
									</g>
								</svg>
							</div>
							<div className="lp-fifth-scroll-content-lines">
								Benefit from our extensive industry knowledge
								and seasoned professionals who bring years of
								experience to the table, ensuring that you
								receive top-notch, informed services.
							</div>
						</div>
						<div className="lp-fifth-scroll-content">
							<div className="lp-fifth-scroll-content-heading">
								Reliability & Consistency
								<svg
									width="23"
									height="24"
									viewBox="0 0 23 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<g clipPath="url(#clip0_448_223)">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M0 12C0 8.8174 1.2116 5.76516 3.36827 3.51472C5.52494 1.26428 8.45001 0 11.5 0C14.55 0 17.4751 1.26428 19.6317 3.51472C21.7884 5.76516 23 8.8174 23 12C23 15.1826 21.7884 18.2348 19.6317 20.4853C17.4751 22.7357 14.55 24 11.5 24C8.45001 24 5.52494 22.7357 3.36827 20.4853C1.2116 18.2348 0 15.1826 0 12ZM10.8437 17.136L17.4647 8.4992L16.2687 7.5008L10.6229 14.8624L6.624 11.3856L5.64267 12.6144L10.8437 17.136Z"
											fill="#00ADB5"
										/>
									</g>
								</svg>
							</div>
							<div className="lp-fifth-scroll-content-lines">
								Rely on our proven track record of delivering
								reliable and trustworthy services. Our
								commitment to integrity and transparency ensures
								that you can have complete confidence in our
								offerings, establishing a long-term partnership
								built on trust and dependability.
							</div>
						</div>
						<div className="lp-fifth-scroll-content">
							<div className="lp-fifth-scroll-content-heading">
								Ease of Use
								<svg
									width="23"
									height="24"
									viewBox="0 0 23 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<g clipPath="url(#clip0_448_223)">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M0 12C0 8.8174 1.2116 5.76516 3.36827 3.51472C5.52494 1.26428 8.45001 0 11.5 0C14.55 0 17.4751 1.26428 19.6317 3.51472C21.7884 5.76516 23 8.8174 23 12C23 15.1826 21.7884 18.2348 19.6317 20.4853C17.4751 22.7357 14.55 24 11.5 24C8.45001 24 5.52494 22.7357 3.36827 20.4853C1.2116 18.2348 0 15.1826 0 12ZM10.8437 17.136L17.4647 8.4992L16.2687 7.5008L10.6229 14.8624L6.624 11.3856L5.64267 12.6144L10.8437 17.136Z"
											fill="#00ADB5"
										/>
									</g>
								</svg>
							</div>
							<div className="lp-fifth-scroll-content-lines">
								Our user-friendly interface ensures a seamless
								experience, making it effortless for you to
								navigate and access our services, ultimately
								saving you time and enhancing overall
								satisfaction.
							</div>
						</div>
						<div className="lp-fifth-scroll-content">
							<div className="lp-fifth-scroll-content-heading">
								Customer-Centric Approach
								<svg
									width="23"
									height="24"
									viewBox="0 0 23 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<g clipPath="url(#clip0_448_223)">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M0 12C0 8.8174 1.2116 5.76516 3.36827 3.51472C5.52494 1.26428 8.45001 0 11.5 0C14.55 0 17.4751 1.26428 19.6317 3.51472C21.7884 5.76516 23 8.8174 23 12C23 15.1826 21.7884 18.2348 19.6317 20.4853C17.4751 22.7357 14.55 24 11.5 24C8.45001 24 5.52494 22.7357 3.36827 20.4853C1.2116 18.2348 0 15.1826 0 12ZM10.8437 17.136L17.4647 8.4992L16.2687 7.5008L10.6229 14.8624L6.624 11.3856L5.64267 12.6144L10.8437 17.136Z"
											fill="#00ADB5"
										/>
									</g>
								</svg>
							</div>
							<div className="lp-fifth-scroll-content-lines">
								Enjoy a seamless and client-focused experience
								with our responsive and dedicated team, placing
								your satisfaction at the forefront of our
								priorities, and providing ongoing support to
								ensure your success.
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="sixth-scroll">
				<div className="lp-sixth-scroll-outer-container">
					<div className="lp-sixth-scroll-left-content">
						<div className="lp-sixth-scroll-pre-heading">
							Need our Doctor’s Counselling?
						</div>
						<div className="lp-sixth-scroll-heading">
							Request a Call Back Today
						</div>
						<div className="lp-sixth-scroll-lines">
							If you or someone you know is struggling with mental
							health issues, it&apos;s important to seek
							professional help.
						</div>
						<div className="lp-sixth-scroll-conclusion">
							<Image
								className="lp-sixth-scroll-conclusion-image"
								src={sixthScrollDoctors}
								width={100}
								height={50}
								alt="guys"
							/>
							<div className="lp-sixth-scroll-conclusion-line">
								Our Doctors are waiting for your service
							</div>
						</div>
					</div>
					<div className="lp-sixth-scroll-right-content">
						<div className="lp-sixth-scroll-input-containers">
							<div className="lp-sixth-scroll-name-input">
								<Input placeholder={"Your Name"}></Input>
							</div>
							<div className="lp-sixth-scroll-phone-input">
								<Input
									placeholder={"Your Phone Number"}></Input>
							</div>
							<div className="lp-sixth-scroll-date-input">
								<Input placeholder={"Date"}></Input>
							</div>
						</div>
						<div className="lp-sixth-scroll-request-now">
							<Button type="fill">Request Now</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="lp-footer">
				<div className="lp-footer-left-content">
					<div className="lp-footer-heading">ZENBUDDY</div>
					<div className="lp-footer-lines">
						Unlock a world of possibilities through meaningful
						connections. A trusted companion can serve as the ideal
						collaborator to share and cherish life&apos;s precious
						moments
					</div>
					<div className="lp-footer-link-container">
						<a href="#">
							<svg
								width="42"
								height="42"
								viewBox="0 0 42 42"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M21 0C9.3975 0 0 9.3975 0 21C0 30.2925 6.01125 38.1413 14.3587 40.9238C15.4087 41.1075 15.8025 40.4775 15.8025 39.9263C15.8025 39.4275 15.7763 37.7738 15.7763 36.015C10.5 36.9863 9.135 34.7287 8.715 33.5475C8.47875 32.9437 7.455 31.08 6.5625 30.5812C5.8275 30.1875 4.7775 29.2162 6.53625 29.19C8.19 29.1637 9.37125 30.7125 9.765 31.3425C11.655 34.5187 14.6738 33.6263 15.8813 33.075C16.065 31.71 16.6162 30.7913 17.22 30.2662C12.5475 29.7412 7.665 27.93 7.665 19.8975C7.665 17.6138 8.47875 15.7237 9.8175 14.2537C9.6075 13.7287 8.8725 11.5763 10.0275 8.68875C10.0275 8.68875 11.7863 8.1375 15.8025 10.8413C17.4825 10.3688 19.2675 10.1325 21.0525 10.1325C22.8375 10.1325 24.6225 10.3688 26.3025 10.8413C30.3188 8.11125 32.0775 8.68875 32.0775 8.68875C33.2325 11.5763 32.4975 13.7287 32.2875 14.2537C33.6263 15.7237 34.44 17.5875 34.44 19.8975C34.44 27.9562 29.5312 29.7412 24.8588 30.2662C25.62 30.9225 26.2763 32.1825 26.2763 34.1512C26.2763 36.96 26.25 39.2175 26.25 39.9263C26.25 40.4775 26.6438 41.1338 27.6938 40.9238C31.8626 39.5164 35.4852 36.8371 38.0516 33.263C40.6179 29.6889 41.9989 25.4 42 21C42 9.3975 32.6025 0 21 0Z"
									fill="white"
								/>
							</svg>
						</a>
						<a href="#">
							<svg
								width="41"
								height="42"
								viewBox="0 0 41 42"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20.6336 6.46094C20.6482 6.46097 20.6639 6.46101 20.6807 6.46105L20.8622 6.46163C22.968 6.46955 33.6411 6.5488 36.5188 7.34131C38.2829 7.82601 39.672 9.25441 40.1435 11.0676C40.403 12.0638 40.5839 13.3878 40.71 14.7495L40.7345 15.0223C40.7543 15.2499 40.7727 15.478 40.7896 15.7052L40.8093 15.9774C40.9778 18.377 40.9974 20.6224 40.9997 21.1137L41 21.18C41 21.1854 41 21.1942 41 21.1942V21.2315C41 21.2315 41 21.2403 41 21.2457L40.9997 21.312C40.9973 21.8219 40.9763 24.2208 40.7896 26.7206L40.7686 26.9936L40.7462 27.267C40.6193 28.77 40.429 30.2624 40.1435 31.3581C39.672 33.1713 38.2829 34.6 36.5188 35.0844C33.5452 35.9036 22.2478 35.961 20.6807 35.965L20.5601 35.9652C20.5502 35.9653 20.5415 35.9653 20.534 35.9653L20.4848 35.9653C20.4848 35.9653 20.4734 35.9653 20.4659 35.9653L20.3192 35.965C19.5273 35.963 16.2502 35.9473 12.8183 35.8266L12.3796 35.8106C12.3063 35.8078 12.2331 35.805 12.1599 35.8022L11.7206 35.7844L11.2823 35.7654C8.43922 35.6375 5.72847 35.4279 4.48147 35.0844C2.71739 34.6 1.32827 33.1713 0.856787 31.3581C0.571155 30.2624 0.380733 28.77 0.253785 27.267L0.231396 26.9936L0.210364 26.7206C0.0304423 24.3117 0.00432468 21.9965 0.000533409 21.3751L8.03646e-05 21.2861C4.8572e-05 21.2781 2.20782e-05 21.2707 0 21.264V21.1617C2.20782e-05 21.155 4.8572e-05 21.1476 8.03646e-05 21.1396L0.000533409 21.0507C0.00396701 20.4879 0.0257131 18.5359 0.163439 16.3831L0.181265 16.1131C0.18434 16.0679 0.187466 16.0227 0.190645 15.9774L0.210364 15.7052C0.227337 15.478 0.24568 15.2499 0.265502 15.0223L0.290005 14.7495C0.416142 13.3878 0.597121 12.0638 0.856787 11.0676C1.32827 9.25441 2.71739 7.82601 4.48147 7.34131C5.72847 6.99789 8.43922 6.78841 11.2823 6.66062L11.7206 6.6416L12.1599 6.62382C12.2331 6.62096 12.3063 6.61815 12.3796 6.61539L12.8183 6.5994C16.0311 6.48642 19.1083 6.4655 20.1378 6.46163L20.3192 6.46105C20.336 6.46101 20.3518 6.46097 20.3663 6.46094H20.6336ZM16.4001 14.8903V27.5354L27.0517 21.2132L16.4001 14.8903Z"
									fill="white"
								/>
							</svg>
						</a>
					</div>
				</div>
				<div className="lp-footer-right-content">
					<div className="lp-footer-link-group-1">
						<div className="lp-footer-link-group-heading">Help</div>
						<div className="lp-footer-link-group-links">
							<a href="#">About</a>
							<a href="#">Contact Us</a>
							<a href="#">Terms</a>
							<a href="#">Privacy</a>
							<a href="#">Cookies</a>
						</div>
					</div>
					<div className="lp-footer-link-group-2">
						<div className="lp-footer-link-group-heading">
							Offer
						</div>
						<div className="lp-footer-link-group-links">
							<a href="#">Buy a Gift</a>
							<a href="#">Redeem a Gift</a>
							<a href="#">Groups & Teams</a>
							<a href="#">Health Care</a>
							<a href="#">Cookies</a>
						</div>
					</div>
					<div className="lp-footer-link-group-3">
						<div className="lp-footer-link-group-heading">
							Company
						</div>
						<div className="lp-footer-link-group-links">
							<a href="#">About</a>
							<a href="#">Login</a>
							<a href="#">Sign up</a>
							<a href="#">Our Instructors</a>
							<a href="#">Cookies</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingPage;
