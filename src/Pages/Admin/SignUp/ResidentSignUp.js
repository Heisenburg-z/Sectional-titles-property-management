import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../../utils/firebase"; // Import your Firebase configuration
import { setDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ResidentSignUp.css";

const db = getFirestore();

function ResidentSignUpForm() {
    const navigate = useNavigate();
    const role = 'Resident';

    const [userName, setUserName] = useState("");
    const [userAddress, setuserAddress] = useState("");
    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [error, setError] = useState(null);

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            return;
        }
    
        try {
            // Create a new user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
    
            // Send email verification
            await sendEmailVerification(userCredential.user);
    
            // Get user details from the userCredential
            const user = userCredential.user;
    
            // Add the user's details to Firestore
            await setDoc(doc(db, "accounts", user.uid), {
                roles: role,
                name: name,
                idNumber: idNumber,
                surName: surName,
                userName: userName,
                userAddress: userAddress,
                email: email,
                cellPhone: cellPhone,
            });
    
            toast.success("Account created successfully. Please verify your email.");
            navigate(-1);
        } catch (error) {
            // Handle any errors that may occur during signup
            console.log(error);
            setError("An error occurred during signup");
            toast.error("An error occurred during signup");
        }
    };
    
    return (
        <section className="formBox">
            <ToastContainer />
            <Form className="form" onSubmit={handleSubmit}>
                {/* Input fields for form data */}
                <input
                    type="text"
                    className="input-field"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="Surname"
                    value={surName}
                    onChange={(e) => setSurName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    className="input-field"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    className="input-field"
                    placeholder="Cellphone number"
                    value={cellPhone}
                    onChange={(e) => setCellPhone(e.target.value)}
                    required
                />
                <textarea
                    className="input-field"
                    placeholder="Apartment/Room Number"
                    onChange={(e) => setuserAddress(e.target.value)}
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="ID/Passport Number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {/* Submit button */}
                {error && <center><p className="error-message" style={{ color: "red" }}>{error}</p></center>}
                <button type="submit">Create account</button>
            </Form>
            <button id="back-button" onClick={() => navigate(-1)}>Go Back</button>
        </section>
    );
}

export default ResidentSignUpForm;
