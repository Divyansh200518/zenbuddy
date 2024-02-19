import { initializeApp } from "firebase/app";
import {
	getAuth,
	setPersistence,
	inMemoryPersistence,
	browserLocalPersistence,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	getIdToken,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithCredential,
	linkWithCredential,
	onAuthStateChanged,
} from "firebase/auth";

import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
	connectStorageEmulator,
} from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
	apiKey: "AIzaSyBVFf4ufM56fKLN1qThikoFFe_giy68uAg",
	authDomain: "zenbuddy.firebaseapp.com",
	projectId: "zenbuddy",
	storageBucket: "zenbuddy.appspot.com",
	messagingSenderId: "724183566613",
	appId: "1:724183566613:web:0af090f094f867b05fc11c",
	measurementId: "G-VCGFGDC48Q",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();

const db = getFirestore(app);

// export async function checkAuth(){
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/auth.user
//       const uid = user.uid;
//       console.log(uid);
//       return true
//       // ...
//     } else {
//       return false
//       // User is signed out
//       // ...
//     }
//   });

// }
const clientId =
	"724183566613-0sofmjg3gosomr7pel4lrg2vp9a2ekso.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = "http://localhost:3000/oauth2callback";
export async function uploadAttachment(file, uid) {
	return new Promise(async (resolve, reject) => {
		const fileName = uuidv4();
		const storageRef = ref(storage, `/image/${fileName}`);
		const uploadTask = await uploadBytes(storageRef, file).then(
			(snapshot) => {
				getDownloadURL(snapshot.ref).then(async (downloadURL) => {
					// console.log("File available at", downloadURL);
					try {
						const docRef = await addDoc(collection(db, "image"), {
							metadata: {
								contentType: snapshot.metadata.contentType,
								owner_uid: uid,
							},
							fileName: fileName,
							url: downloadURL,
						});
						const response = await updateUser(uid, {
							photoURL: downloadURL,
						});
						console.log({ response });
						resolve(response);
						console.log("Document written with ID: ", docRef);
					} catch (e) {
						console.error("Error adding document: ", e);
					}
				});
			}
		);
	});
}
export async function signInwithGoogle() {
	return new Promise((resolve, reject) => {
		const provider = new GoogleAuthProvider();
		// provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
		provider.addScope(
			"https://www.googleapis.com/auth/fitness.activity.read"
		);
		signInWithPopup(auth, provider)
			.then(async (result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				// const googleApiCredential =
				// 	GoogleAuthProvider.credentialFromResult(result);

				const credential =
					GoogleAuthProvider.credentialFromResult(result);
				const googleIdToken = credential.idToken;
				const googleAccessToken = credential.accessToken;
				// const credential = GoogleAuthProvider.credential(idToken);
				// console.log({ googleIdToken });
				// const googleIdToken = credential.idToken;
				// The signed-in user info.
				const user = result.user;
				// Sign in with credential from the Google user.
				signInWithCredential(auth, credential)
					.then(async (userCredential) => {
						return getIdToken(userCredential.user).then(
							async (idToken) => {
								// console.log("userCredential", userCredential);
								// console.log("idtoeken", idToken);
								var response = await fetch(
									`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/sessionLogin`,
									{
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											idToken,
											accessToken:
												userCredential.user.accessToken,
										}),
									}
								);
								var data = await response.json();
								localStorage.setItem(
									"sessionCookie",
									data.sessionCookie
								);
								localStorage.setItem(
									"accessToken",
									googleAccessToken
								);
								resolve(data.status);
							}
						);
					})
					.catch(async (error) => {
						// Handle Errors here.
						const errorCode = error.code;
						const errorMessage = error.message;
						// The email of the user's account used.
						const email = error.email;
						// The credential that was used.
						const credential =
							GoogleAuthProvider.credentialFromError(error);
						// console.log({ credential });
						resolve(false);
					});
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				console.log({ errorMessage });
				const email = error.customData.email;
				// The AuthCredential type that was used.
				console.log({ email });
				const credential =
					GoogleAuthProvider.credentialFromError(error);
				// ...
				console.log({ credential });
				resolve(false);
			});
	});
}

export async function signup(credentials) {
	return new Promise((resolve, reject) => {
		createUserWithEmailAndPassword(
			auth,
			credentials.email,
			credentials.password
		)
			.then(async (userCredential) => {
				// Signed up
				const user = userCredential.user;
				console.log(user);
				if (user) {
					const response = await signin(credentials);
					if (response.status) resolve(true);
				}
				resolve(false);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
				resolve(false);
				// ..
			});
	});
}

export async function emailChecker(email) {
	return new Promise(async (resolve, reject) => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/emailChecker`,
			{
				// const response = await fetch(`${backendUrl}/username`, {
				method: "POST",
				body: JSON.stringify({
					email: email.toLowerCase(),
				}),
				headers: {
					"Content-type": "application/json",
				},
			}
		);
		resolve(response);
	});
}
export async function updateUser(uid, userData) {
	return new Promise(async (resolve, reject) => {
		try {
			var response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/updateUser`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ uid, userData }),
				}
			);
			var data = await response.json();
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
}

export async function signin(credentials) {
	return new Promise((resolve, reject) => {
		setPersistence(auth, browserLocalPersistence)
			.then(() => {
				signInWithEmailAndPassword(
					auth,
					credentials.email,
					credentials.password
				)
					.then((userCredential) => {
						// console.log({ userCredential });
						return getIdToken(userCredential.user).then(
							async (idToken) => {
								// console.log("idtoeken", idToken);
								var response = await fetch(
									`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/sessionLogin`,
									{
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({ idToken }),
									}
								);
								var data = await response.json();
								localStorage.setItem(
									"sessionCookie",
									data.sessionCookie
								);
								resolve({ status: data.status });
							}
						);
					})
					.catch((error) => {
						console.log({ error });
						resolve({ status: false, error });
					});
			})
			.catch((error) => {
				console.log({ error });
				resolve({ status: false, error });
			});
	});
	// console.log("USER LOGGED IN")
	// When the user signs in with email and password.
}

export async function checkAuthentication(sessionCookie) {
	// console.log({ sessionCookie });
	try {
		var response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/profile`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ session: sessionCookie }),
			}
		);
		var data = await response.json();
		// console.log({ data });
		return data;
	} catch (error) {
		// alertMessage("Cannot fetch ", error);
		// console.log(error);
		return { status: false };
	}
}

export async function logout() {
	return new Promise(async (resolve, reject) => {
		const sessionCookie = localStorage.getItem("sessionCookie");
		var response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/sessionLogout`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ session: sessionCookie }),
			}
		);
		var data = await response.json();
		if (data) {
			localStorage.clear();
			await signOut(auth)
				.then(() => {
					// console.log(error);
					console.log("loggedOut Successfully");
					resolve(true);
					// Sign-out successful.
				})
				.catch((error) => {
					console.log(error);
					console.log("log out unsuccessful");
					resolve(false);
					// An error happened.
				});
		}
		resolve(false);
	});
}
