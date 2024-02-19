const express = require("express");

var admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const { getStorage } = require("firebase-admin/storage");
const { getFirestore } = require("firebase-admin/firestore");
const http = require("http");
const socketIo = require("socket.io");
const https = require("https");
const fs = require("fs");
var serviceAccount = require("./zenbuddy-firebase-adminsdk-5va3i-f31cc21326.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: "zen-buddy-backend.appspot.com",
});

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyChI281vOEVojpsficRjJsDD9Wnid922vU");

const bucket = getStorage().bucket();

var cors = require("cors");

const app = express();
const hostname = "0.0.0.0";
const port = 3002;
const db = getFirestore();
const options = {
	key: fs.readFileSync("./private.key"),
	cert: fs.readFileSync("./certificate.crt"),
};
const server = http.createServer(options, app);
// const server = https.createServer(options, app);
const io = socketIo(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

app.use(cors({ origin: "*" }));
app.use(express.json());

var online = {};
var chats = {};
var friends = {
	// "om200518@gmail.com": [
	// 	{
	// 		email: "divyansh200518@gmail.com",
	// 		photoUrl: "",
	// 		status: "offline",
	// 		displayName: "Divyansh Vijay",
	// 	},
	// 	{
	// 		email: "priyanshu2004ss@gmail.com",
	// 		photoUrl: "",
	// 		status: "offline",
	// 		displayName: "Priyanshu",
	// 	},
	// 	{
	// 		email: "kunwaraditya0073@gmail.com",
	// 		photoUrl: "",
	// 		status: "offline",
	// 		displayName: "Kunwar Aditya",
	// 	},
	// ],
	// "divyansh200518@gmail.com": [
	// 	{
	// 		email: "om200518@gmail.com",
	// 		photoUrl: "",
	// 		status: "offline",
	// 		displayName: "Divyansh Vijay",
	// 	},
	// ],
	// "priyanshu2004ss@gmail.com": [
	// 	{
	// 		email: "om200518@gmail.com",
	// 		photoUrl: "",
	// 		status: "offline",
	// 		displayName: "Divyansh Vijay",
	// 	},
	// ],
	// "kunwaraditya0073@gmail.com": [
	// 	{
	// 		email: "om200518@gmail.com",
	// 		photoUrl: "",
	// 		status: "offline",
	// 		displayName: "Divyansh Vijay",
	// 	},
	// ],
};
var aiHistory = {};
// var oldOnline = [];

// setInterval(() => {
// if (oldOnline != online) {
// console.log({ online });
// console.log({ chats });
// console.log(friends);
// 	oldOnline = online;
// }
// }, 10000);

// setInterval(() => {
// 	// console.log({ size: io.of("/").sockets.size });
// }, 1000);
async function ai(prompt, email) {
	return new Promise(async (resolve, reject) => {
		let chat;
		if (!aiHistory[email]) {
			aiHistory[email] = {};
		}
		let history = aiHistory[email]["ai"] || [];
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		chat = model.startChat({
			history: history,
			generationConfig: {
				maxOutputTokens: 300,
			},
		});
		history.push({
			role: "user",
			parts: prompt,
		});
		const result = await chat.sendMessage(prompt);
		const response = await result.response;
		const text = response.text();
		history.push({
			role: "model",
			parts: text,
		});
		aiHistory[email]["ai"] = history;
		resolve({ text });
	});
}

io.on("connection", (socket) => {
	socket.on("initial", ({ email }) => {
		console.log(email + " connected with id" + socket.id);
		// online.push({ email: socket.id });
		online[email] = socket.id;
		io.to(socket.id).emit("friends", { friends: friends[email] || [] });
		io.to(socket.id).emit("prevChat", { chat: chats[email] || {} });
		io.emit("usersonline", { users: online });
	});

	socket.on("ai", async ({ data }) => {
		console.log({ data });
		if (!chats[data.email]) {
			chats[data.email] = {};
		}
		var aiChat = chats[data.email]["ai"] || [];
		aiChat.push(data);
		io.to(socket.id).emit("ai", {
			data: data,
		});
		const aiReplyResponse = await ai(data.msg, data.email);
		// const aiReplyData = await aiReplyResponse.text();
		io.to(socket.id).emit("ai", {
			data: {
				msg: aiReplyResponse.text,
				displayName: "Ai Buddy",
				email: "ai",
				uid: "ai",
			},
		});
		aiChat.push({
			msg: aiReplyResponse.text,
			displayName: "Ai Buddy",
			email: "ai",
			uid: "ai",
		});
		chats[data.email]["ai"] = aiChat;
		console.log(chats[data.email]);
		// console.log(aiReplyResponse);
	});

	socket.on("addFriend", ({ sender, email }) => {
		getAuth()
			.getUserByEmail(email)
			.then((userRecord) => {
				console.log(
					`Successfully fetched user data: ${userRecord.toJSON()}`
				);

				var senderFriends = [];

				if (friends.hasOwnProperty(sender)) {
					senderFriends = friends[sender];
				}

				senderFriends.push({
					email: userRecord.email,
					photoUrl: userRecord.photoURL,
					status: "offline",
					displayName: userRecord.displayName || userRecord.email,
				});
				friends[sender] = senderFriends;
				io.to(socket.id).emit("friends", {
					friends: friends[sender] || [],
				});
			})

			.catch((error) => {
				console.log("Error fetching user data:", error);
			});
		getAuth()
			.getUserByEmail(sender)
			.then((userRecord) => {
				console.log(
					`Successfully fetched user data: ${userRecord.toJSON()}`
				);

				var friendFriends = [];

				if (friends.hasOwnProperty(email)) {
					friendFriends = friends[email];
				}

				friendFriends.push({
					email: userRecord.email,
					photoUrl: userRecord.photoURL,
					status: "offline",
					displayName: userRecord.displayName || userRecord.email,
				});
				friends[email] = friendFriends;

				io.to(online[email]).emit("friends", {
					friends: friends[email] || [],
				});
			})

			.catch((error) => {
				console.log("Error fetching user data:", error);
			});
	});

	socket.on("chatMessage", ({ receiver, sender, data }) => {
		console.log({ receiver, sender, data });
		if (
			Object.keys(online).length > 0 &&
			online.hasOwnProperty(receiver.email)
		) {
			console.log("receiver online", online[receiver.email]);
			io.to(online[receiver.email]).emit("chatMessage", {
				receiver,
				sender,
				data,
			});
		}
		io.to(online[sender.email]).emit("chatMessage", {
			receiver,
			sender,
			data,
		});
		if (!chats[sender.email]) {
			chats[sender.email] = {};
		}
		if (!chats[receiver.email]) {
			chats[receiver.email] = {};
		}
		var senderChat = chats[sender.email] || {};
		var receiverChat = chats[receiver.email] || {};
		var receiverSenderChat = receiverChat[sender.email] || [];
		var senderReceiverChat = senderChat[receiver.email] || [];

		if (receiver.email !== sender.email) {
			receiverSenderChat.push(data);
		}
		senderReceiverChat.push(data);

		chats[sender.email][receiver.email] = senderReceiverChat;
		chats[receiver.email][sender.email] = receiverSenderChat;
	});

	socket.on("callUser", ({ userId, offer }) => {
		console.log("Call initiated by: ", socket.id, " to user: ", userId);
		io.to(userId).emit("incomingCall", {
			callerId: socket.id,
			offer: offer,
		});
	});

	socket.on("callAccepted", ({ calleeId }) => {
		console.log("Call accepted by: ", socket.id, " from user: ", calleeId);
		io.to(calleeId).emit("callAccepted", { calleeId: socket.id });
	});

	socket.on("answer", ({ id, answer }) => {
		io.to(id).emit("answer", { answer });
	});

	socket.on("disconnect", () => {
		console.log("WebSocket disconnected: ", socket.id);
		io.emit("usersonline", { users: online });
	});
});
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/sessionLogin", async (req, res) => {
	// Get the ID token passed and the CSRF token.
	console.log(req.body);
	const idToken = req.body.idToken.toString();
	// const accessToken = req.body.accessToken.toString();

	console.log({ idToken });
	// const csrfToken = req.body.csrfToken.toString();
	// Guard against CSRF attacks.
	// if (csrfToken !== req.cookies.csrfToken) {
	//   res.status(401).send('UNAUTHORIZED REQUEST!');
	//   return;
	// }
	// Set session expiration to 5 days.
	const expiresIn = 60 * 60 * 24 * 5 * 1000;
	// const expiresIn = 60 * 5 * 1000;
	getAuth()
		.createSessionCookie(idToken, { expiresIn })
		.then(
			(sessionCookie) => {
				// Set cookie policy for session cookie.
				const options = {
					maxAge: expiresIn,
					httpOnly: true,
					secure: true,
					sameSite: "None",
				};
				// res.cookie("session", sessionCookie, options);
				console.log({ status: "success" });
				res.end(
					JSON.stringify({
						status: "true",
						sessionCookie: sessionCookie,
					})
				);
			},
			(error) => {
				console.log(error);
				res.status(401).send("UNAUTHORIZED REQUEST!");
			}
		);
});

app.post("/profile", (req, res) => {
	const sessionCookie = req.body.session || "";
	getAuth()
		.verifySessionCookie(sessionCookie, true /** checkRevoked */)
		.then(async (decodedClaims) => {
			// console.log("logged in", decodedClaims.email);
			await getAuth()
				.getUser(decodedClaims.uid)
				.then(async (userRecord) => {
					const usersRef = db
						.collection("users")
						.doc(decodedClaims.uid);
					const doc = await usersRef.get();
					if (!doc.exists) {
						console.log("No such document!");
					} else {
						// console.log("Document data:", doc.data());
					}

					let userRecordToSend = {
						...userRecord,
						...doc.data(),
					};
					// See the UserRecord reference doc for the contents of userRecord.
					// console.log(
					// 	`Successfully fetched user data: ${userRecordToSend}`
					// );
					res.send({ status: true, userData: userRecordToSend });
				})
				.catch((error) => {
					console.log("Error fetching user data:", error);
					res.send({ status: false });
				});
			// serveContentForUser('/profile', req, res, decodedClaims);
		})
		.catch((error) => {
			console.log("not logged in");
			res.send({ status: false });
			// Session cookie is unavailable or invalid. Force user to login.
			// res.redirect('/login');
		});
});

const statusCode = {
	0: "Email not found",
	1: "Email Found",
	2: "Provider Mismatch",
};

app.post("/emailChecker", (req, res) => {
	const email = req.body.email || "";
	console.log(email);
	getAuth()
		.getUserByEmail(email)
		.then((userRecord) => {
			console.log(userRecord);
			console.log(
				`Successfully fetched user data: ${userRecord.toJSON()}`
			);
			if (userRecord.emailVerified) {
				res.send({ status: true, statusCode: 2, provider: "google" });
			} else {
				res.send({ status: true, statusCode: 1, provider: "email" });
			}
		})
		.catch((error) => {
			console.log("Error fetching user data:", error);
			res.send({ status: false, statusCode: 0, provider: null });
		});
});

app.post("/updateUser", (req, res) => {
	console.log(req.body);
	const uid = req.body.uid || "";
	const userData = req.body.userData || {};
	var allowedUserData = [
		"email",
		"emailVerified",
		"phoneNumber",
		"password",
		"displayName",
		"photoURL",
		"disabled",
	];
	var appropriateUserData = {};
	var inappropriateUserData = {};
	for (let key in userData) {
		if (allowedUserData.includes(key)) {
			appropriateUserData[key] = userData[key];
		} else {
			inappropriateUserData[key] = userData[key];
		}
	}
	console.log({ appropriateUserData, inappropriateUserData });

	console.log({ uid, userData });

	// {
	// 	email: "modifiedUser@example.com",
	// 	phoneNumber: "+11234567890",
	// 	emailVerified: true,
	// 	password: "newPassword",
	// 	displayName: "Jane Doe",
	// 	photoURL: "http://www.example.com/12345678/photo.png",
	// 	disabled: true,
	// }
	getAuth()
		.updateUser(uid, userData)
		.then(async (userRecord) => {
			console.log("Successfully updated user", userRecord.toJSON());

			const userRef = db.collection("users").doc(userRecord.uid);

			const response = await userRef.set(inappropriateUserData, {
				merge: true,
			});
			// Add a new document in collection "cities" with ID 'LA'
			res.send({ status: true, userData: userRecord });
		})
		.catch((error) => {
			console.log("Error updating user:", error);
			res.send({ status: false });
		});
});

app.post("/sessionLogout", (req, res) => {
	const sessionCookie = req.body.session || "";
	// res.clearCookie('session');
	getAuth()
		.verifySessionCookie(sessionCookie)
		.then((decodedClaims) => {
			return getAuth().revokeRefreshTokens(decodedClaims.sub);
		})
		.then(() => {
			res.send({ status: true });
			// res.redirect('/login');
		})
		.catch((error) => {
			res.send({ status: true });
			// res.redirect('/login');
		});
});

app.post("/uploadToStorage", (req, res) => {});

server.listen(port, hostname, () => {
	console.log(`App listening on ${hostname}:${port}`);
});
