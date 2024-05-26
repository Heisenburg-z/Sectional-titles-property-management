import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../utils/firebase";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { useAuth } from "../../utils/auth";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//

const db = getFirestore();

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth20 = useAuth();

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      const docRef = doc(db, "accounts", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userRole = userData.roles;

        auth20.login(
          `${userData.name} ${userData.surName}`,
          user.uid,
          userRole.toLowerCase(),
        );

        setLoading(false);
        toast.success("Login successful!");

        switch (userRole) {
          case "Admin":
            navigate("/admin/dashboard", { replace: true });
            break;
          case "Resident":
            navigate("/resident/dashboard");
            break;
          case "Staff":
            navigate("/staff/dashboard");
            break;
          default:
            navigate("/nopage");
            break;
        }
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error.message);
    }
  };

  return (
    <section className="LoginPage" data-testid="custom-section">
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Oval
            height={100}
            width={100}
            color="#00a1f1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#00a1f1"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : !auth20.user ? (
        <form className="LoginForm" method="POST" action="/admin">
          <h1 className="login">Login</h1> <br />
          <br />
          <input
            data-testid="input-username"
            type="text"
            className="user"
            required
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            data-testid="input-password"
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
        </form>
      ) : (
        <h1>You are already logged in</h1>
      )}
    </section>
  );
}

export default LoginForm;
