import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../utils/firebase";
import { doc, getFirestore,getDoc } from "firebase/firestore";
const db = getFirestore();

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        // getting user's role
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef).then((snap) => {
          console.log(snap.data());
        });

        navigate("/admin");
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode) {
          setError(true);
        }
        console.log(errorCode);
      });
  };
  return (
    <section className="LoginPage">
      <Form className="LoginForm" method="POST" action="/admin">
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
        <button onClick={onLogin}>Login</button>
      </Form>
    </section>
  );
}

export default LoginForm;
