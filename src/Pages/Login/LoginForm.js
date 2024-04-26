import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../utils/firebase";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { useAuth } from "../../utils/auth";

const db = getFirestore();

function LoginForm() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	// auth 20 is the auth for page routing and not to be confused with firease auth.
	const auth20 = useAuth();
	const onLogin = async (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);

				// Fetch user's role from Firestore
				const docRef = doc(db, "accounts", user.uid);
				await getDoc(docRef).then((docSnap) => {
					if (docSnap.exists()) {
						const userData = docSnap.data();
						const userRole = userData.roles;

						// Navigate based on user's role

						auth20.login(userData.name);

						switch (userRole) {
							case "Admin":
								navigate("/admin/dashboard", { replace: true });
								break;
							case "Resident":
								navigate("/resident");
								break;
							case "Staff":
								navigate("/staff");
								break;
							default:
								navigate("/admin");
								break;
						}
					}
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if (errorCode) {
					setError(true);
				}
				console.log(errorCode, errorMessage);
			});
	};

	return (
		<section className="LoginPage">
			{!auth20.user ? (
				<Form className="LoginForm" method="POST" action="/admin">
					<h1 className="login">Login</h1> <br />
					<br />
					<input
						type="text"
						className="user"
						required
						placeholder="Username"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						required
						className="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label className={error ? "invalidemail" : "validemail"}>
						Invalid email or password{" "}
					</label>
					<button className="loginbtn" onClick={onLogin}>
						Login
					</button>
				</Form>
			) : (
				<h1>You are already logged in</h1>
			)}
		</section>
	);
}

export default LoginForm;
