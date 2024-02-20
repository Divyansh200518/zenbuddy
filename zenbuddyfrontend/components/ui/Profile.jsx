"use client";
import { useRouter } from "next/navigation";

import Button from "./Button";
import Modal from "./Modal.jsx";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	logout,
	checkAuthentication,
	updateUser,
	uploadAttachment,
} from "../../app/utils/helper.js";
import { useNotification } from "../../components/ui/NotificationProvider.jsx";

const Profile = (userDetail) => {
	const router = useRouter();
	const { alertMessage } = useNotification();

	const [clicked, setClicked] = useState(false);
	const [newUserData, setNewUserData] = useState({
		displayName: "",
		phoneNumber: "",
		email: "",
		password: "",
		age: 0,
		gender: "",
	});
	// console.log(userDetail.userDetail);
	const [userData, setUserData] = useState(userDetail.userDetail);
	// const [manageAccountModalShow, setManageAccountModalShow] = useState(false);
	const [manageAccountModalShow, setManageAccountModalShow] = useState(false);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [profileImageUploading, setProfileImageUploading] = useState(false);

	useEffect(() => {
		setNewUserData({
			displayName: userData.displayName || "",
			phoneNumber: userData.phoneNumber || "",
			email: userData.email || "",
			password: userData.password || "",
			gender: userData.gender || "",
			age: userData.age || "",
		});
	}, []);
	// useEffect(() => {
	// 	console.log(newUserData);
	// }, [newUserData]);

	async function updateUserData() {
		var appropriateUserData = {};
		for (let key in newUserData) {
			if (newUserData[key]) {
				if (newUserData[key] != userData[key]) {
					appropriateUserData[key] = newUserData[key];
				}
			}
		}
		console.log(appropriateUserData);

		// var data = Object.entries(newUserData).filter(
		// 	([key, value]) => value != null || value != ""
		// );
		// console.log({ data });
		if (Object.entries(appropriateUserData).length > 0) {
			const res2 = await updateUser(userData.uid, appropriateUserData);
			if (res2.status) {
				alertMessage("Profile Edit Successful!!", 3000, "green");
				setUserData(res2.userData);
			} else {
				alertMessage("Profile Edit Unsuccessful", 3000, "red");
			}
			console.log({ res2 });
		}
	}

	async function checkLoggedIn() {
		var sessionCookie = localStorage.getItem("sessionCookie") || "";
		// console.log(!sessionCookie)
		// if (!sessionCookie) return false
		var response = await checkAuthentication(sessionCookie);

		console.log({ response });
		if (!response.status) {
			alertMessage("Logged Out Successfully", 3000, "green");
			router.push("/login");
		}
		setIsUserLoggedIn(response.status);

		return response;
	}

	const handleFileUpload = async () => {
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.click();

		fileInput.oninput = async function (e) {
			setProfileImageUploading(true);
			// console.log(e.target.files[0]);
			const response = await uploadAttachment(
				e.target.files[0],
				userData.uid
			);
			if (response.status) {
				alertMessage("Image Changed Successfully", 3000, "green");
				setUserData(response.userData);
				setProfileImageUploading(false);
			} else {
				alertMessage("Image Change Unsuccessful", 3000, "red");
			}
			console.log({ response });
			// attachmentUploader();
		};
	};

	const handleProfilePhotoDelete = async () => {
		setProfileImageUploading(true);
		if (
			userData.photoURL === "https://api.dicebear.com/7.x/pixel-art/svg"
		) {
			alertMessage("This image cannot be removed");
			setProfileImageUploading(false);
			return;
		}
		const response = await updateUser(userData.uid, {
			photoURL: "https://api.dicebear.com/7.x/pixel-art/svg",
		});
		if (response.status) {
			alertMessage("Image Deleted Successfully", 3000, "green");
			setProfileImageUploading(false);
			setUserData(response.userData);
		} else {
			alertMessage("Image Delete Unsuccessful", 3000, "red");
			setProfileImageUploading(false);
		}
		console.log(response);
	};

	const handleProfileClick = () => {
		setClicked((prevClicked) => !prevClicked);
	};
	const handleManageAccountModalShow = () => {
		setManageAccountModalShow((modalShow) => !modalShow);
	};

	const signOut = async () => {
		const res = await logout();
		if (res) {
			checkLoggedIn();
		}
	};

	return (
		<div className="profile-parent-container">
			{clicked ? (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					exist={{ opacity: 1, y: 0 }}
					className="profile-info-container">
					<div className="profile-info">
						<img
							className="user-profile-image"
							src={
								userData.photoURL ===
									"https://api.dicebear.com/7.x/pixel-art/svg" ||
								!userData.photoURL
									? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userData.uid}`
									: userData.photoURL
							}
							alt=""
						/>
						<div className="user-info">
							<div className="user-username">
								{userData.displayName || ":)"}
							</div>
							<div className="user-email">
								{userData.email || ":)"}
							</div>
						</div>
					</div>
					<div className="profile-option-button-container">
						<Button
							type={"normal"}
							width={"100%"}
							onClick={handleManageAccountModalShow}>
							<svg
								width="60"
								height="60"
								viewBox="0 0 60 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M29.5 36C25.91 36 23 33.0899 23 29.5C23 25.9101 25.91 23 29.5 23C33.0897 23 36 25.9101 36 29.5C36 31.2238 35.315 32.8771 34.0963 34.0961C32.8773 35.3152 31.224 36 29.5 36Z"
									stroke="white"
									strokeWidth="3.75"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M44.3116 40.8206V37.0819C44.3116 36.1561 44.6794 35.2683 45.3339 34.6136L47.9776 31.9698C49.3408 30.6066 49.3408 28.3963 47.9776 27.0331L45.3339 24.3893C44.6794 23.7346 44.3116 22.8467 44.3116 21.9209V18.1794C44.3116 16.2515 42.7488 14.6887 40.8211 14.6887H37.0799C36.1542 14.6887 35.2662 14.3209 34.6117 13.6662L31.968 11.0224C30.6048 9.6592 28.3948 9.6592 27.0317 11.0224L24.3882 13.6662C23.7336 14.3209 22.8457 14.6887 21.92 14.6887H18.1788C17.2526 14.6887 16.3644 15.0568 15.7097 15.7121C15.055 16.3673 14.6876 17.2559 14.6883 18.1822V21.9209C14.6883 22.8467 14.3206 23.7346 13.666 24.3893L11.0223 27.0331C9.65922 28.3963 9.65922 30.6066 11.0223 31.9698L13.666 34.6136C14.3206 35.2683 14.6883 36.1561 14.6883 37.0819V40.8206C14.6883 42.7485 16.2511 44.3114 18.1788 44.3114H21.92C22.8457 44.3114 23.7336 44.6791 24.3882 45.3338L27.0317 47.9776C28.3948 49.3408 30.6048 49.3408 31.968 47.9776L34.6117 45.3338C35.2662 44.6791 36.1542 44.3114 37.0799 44.3114H40.8182C41.7445 44.3122 42.6331 43.9447 43.2882 43.2898C43.9434 42.6351 44.3116 41.7469 44.3116 40.8206Z"
									stroke="white"
									strokeWidth="3.75"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<div className="profile-option-button">
								Manage Account
							</div>
						</Button>
						<Button
							onClick={() => signOut()}
							type={"normal"}
							width={"100%"}>
							<svg
								width="60"
								height="60"
								viewBox="0 0 60 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M16.9056 24.076C17.6103 23.3748 17.6132 22.2351 16.912 21.5304C16.2108 20.8257 15.0711 20.8229 14.3664 21.524L16.9056 24.076ZM7.13038 28.7239C6.42569 29.4252 6.42286 30.565 7.12405 31.2696C7.82523 31.9742 8.96492 31.9771 9.66963 31.2761L7.13038 28.7239ZM9.66963 28.7239C8.96492 28.0229 7.82523 28.0258 7.12405 28.7304C6.42286 29.435 6.42569 30.5748 7.13038 31.2761L9.66963 28.7239ZM14.3664 38.4761C15.0711 39.1771 16.2108 39.1742 16.912 38.4696C17.6132 37.765 17.6103 36.6252 16.9056 35.9239L14.3664 38.4761ZM8.40001 28.2C7.4059 28.2 6.60001 29.0059 6.60001 30C6.60001 30.9941 7.4059 31.8 8.40001 31.8V28.2ZM42 31.8C42.9941 31.8 43.8 30.9941 43.8 30C43.8 29.0059 42.9941 28.2 42 28.2V31.8ZM14.3664 21.524L7.13038 28.7239L9.66963 31.2761L16.9056 24.076L14.3664 21.524ZM7.13038 31.2761L14.3664 38.4761L16.9056 35.9239L9.66963 28.7239L7.13038 31.2761ZM8.40001 31.8H42V28.2H8.40001V31.8Z"
									fill="white"
								/>
								<path
									d="M22.8 37.2C22.8 42.5018 27.0981 46.8 32.4 46.8H42C47.3018 46.8 51.6 42.5018 51.6 37.2V22.8C51.6 17.498 47.3018 13.2 42 13.2H32.4C27.0981 13.2 22.8 17.498 22.8 22.8"
									stroke="white"
									strokeWidth="3.6"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<div className="profile-option-button">
								Sign Out
							</div>
						</Button>
					</div>
				</motion.div>
			) : null}
			<div className="profile-container" onClick={handleProfileClick}>
				<img
					className="profile-image"
					src={
						userData.photoURL ===
							"https://api.dicebear.com/7.x/pixel-art/svg" ||
						!userData.photoURL
							? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userData.uid}`
							: userData.photoURL
					}
					alt=""
				/>
			</div>

			{manageAccountModalShow ? (
				<Modal>
					<div className="modalInnerContainer">
						<div className="modal-user-profile-top">
							<div className="modal-user-profile-heading">
								<svg
									viewBox="0 0 60 60"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M30 29.0681C32.507 29.0681 34.9114 28.0722 36.6841 26.2995C38.4569 24.5267 39.4528 22.1224 39.4528 19.6153C39.4528 17.1083 38.4569 14.7039 36.6841 12.9312C34.9114 11.1584 32.507 10.1625 30 10.1625C27.493 10.1625 25.0886 11.1584 23.3159 12.9312C21.5431 14.7039 20.5472 17.1083 20.5472 19.6153C20.5472 22.1224 21.5431 24.5267 23.3159 26.2995C25.0886 28.0722 27.493 29.0681 30 29.0681ZM30 33.2213C17.4319 33.2213 9.375 40.1569 9.375 43.5338V49.8394H50.625V43.5338C50.625 39.45 42.9975 33.2213 30 33.2213Z"
										fill="var(--textColor)"
									/>
								</svg>
								Account
							</div>
							<div>
								<svg
									onClick={handleManageAccountModalShow}
									viewBox="0 0 16 16"
									fill="none"
									style={{ cursor: "pointer" }}
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M4.64645 4.64645C4.84171 4.45118 5.15829 4.45118 5.35355 4.64645L8 7.29289L10.6464 4.64645C10.8417 4.45118 11.1583 4.45118 11.3536 4.64645C11.5488 4.84171 11.5488 5.15829 11.3536 5.35355L8.70711 8L11.3536 10.6464C11.5488 10.8417 11.5488 11.1583 11.3536 11.3536C11.1583 11.5488 10.8417 11.5488 10.6464 11.3536L8 8.70711L5.35355 11.3536C5.15829 11.5488 4.84171 11.5488 4.64645 11.3536C4.45118 11.1583 4.45118 10.8417 4.64645 10.6464L7.29289 8L4.64645 5.35355C4.45118 5.15829 4.45118 4.84171 4.64645 4.64645Z"
										fill="var(--textColor)"
									/>
								</svg>
							</div>
						</div>
						<div className="modal-user-profile-main">
							{/* <div className="modal-user-profile-main-info-container"> */}
							<div className="modal-user-profile-main-info-heading">
								Profile
								{/* </div> */}
							</div>
							<div className="modal-user-profile-main-info-image-outer-container">
								<div className="modal-user-profile-main-info-image-container">
									{profileImageUploading ? (
										<div className="loader"></div>
									) : null}
									<img
										className={
											profileImageUploading
												? "modal-user-profile-main-info-image modal-user-profile-main-info-image-loading"
												: "modal-user-profile-main-info-image"
										}
										src={
											userData.photoURL ===
												"https://api.dicebear.com/7.x/pixel-art/svg" ||
											!userData.photoURL
												? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userData.uid}`
												: userData.photoURL
										}
										alt=""
									/>
								</div>
								<div className="modal-user-profile-main-info-button-container">
									<Button
										style={{
											fontSize: "15px",
											padding: "16px 30px",
										}}
										type={"fill"}
										onClick={handleFileUpload}>
										Change Picture
									</Button>
									<Button
										style={{
											fontSize: "15px",
											padding: "16px 30px",
										}}
										type={"outline"}
										onClick={handleProfilePhotoDelete}>
										Delete Picture
									</Button>
								</div>
							</div>
							<div className="modal-user-profile-main-input-container">
								<div className="modal-user-profile-main-name-input-container">
									<label htmlFor="modal-user-profile-main-name-input-input">
										Full Name
									</label>
									<input
										type="text"
										id="modal-user-profile-main-name-input"
										value={newUserData.displayName || null}
										onChange={(event) =>
											setNewUserData((prev) => ({
												...prev,
												displayName: event.target.value,
											}))
										}
									/>
								</div>
								<div className="modal-user-profile-main-email-input-container">
									<label htmlFor="modal-user-profile-main-email-input-input">
										Email
									</label>
									<input
										disabled
										type="text"
										id="modal-user-profile-main-email-input input-disabled"
										value={newUserData.email || null}
										onChange={(event) =>
											setNewUserData((prev) => ({
												...prev,
												email: event.target.value,
											}))
										}
									/>
								</div>
								<div className="modal-user-profile-main-phno-input-container">
									<label htmlFor="modal-user-profile-main-phno-input-input">
										Phone Number
									</label>
									<input
										type="text"
										id="modal-user-profile-main-phno-input"
										value={newUserData.phoneNumber || null}
										onChange={(event) =>
											setNewUserData((prev) => ({
												...prev,
												phoneNumber: event.target.value,
											}))
										}
									/>
								</div>
								<div className="modal-user-profile-main-age-gender-input-container-wrapper">
									<div className="modal-user-profile-main-age-input-container">
										<label htmlFor="modal-user-profile-main-age-input-input">
											Age
										</label>
										<input
											type="number"
											id="modal-user-profile-main-age-input"
											value={newUserData.age}
											onChange={(event) =>
												setNewUserData((prev) => ({
													...prev,
													age: event.target.value,
												}))
											}
										/>
									</div>

									<div className="modal-user-profile-main-gender-input-container">
										<label htmlFor="modal-user-profile-main-gender-input-input">
											Gender
										</label>
										<select
											value={newUserData.gender}
											onChange={(event) =>
												setNewUserData((prev) => ({
													...prev,
													gender: event.target.value,
												}))
											}
											id="modal-user-profile-main-gender-input-input">
											<option value="">-- --</option>
											<option value="M">Male</option>
											<option value="F">Female</option>
										</select>
										{/* <input
											type="text"
											id="modal-user-profile-main-gender-input"
											value={newUserData.gender}
											onChange={(event) =>
												setNewUserData((prev) => ({
													...prev,
													gender: event.target.value,
												}))
											}
										/> */}
									</div>
								</div>
							</div>
							<div className="modal-user-profile-main-input-button">
								<Button
									onClick={() => updateUserData()}
									style={{ fontSize: "15px" }}
									type={"fill"}>
									Save
								</Button>
							</div>
						</div>
					</div>
				</Modal>
			) : null}
		</div>
	);
};

export default Profile;
