import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../utils/firebase"; // Import your Firebase configuration
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import './SignUpForm.css';
const db = getFirestore();

function SignUpForm() {
  const navigate = useNavigate();

  // State variables for form fields
  const [dropdownValue, setDropdownValue] = useState("");

  const handleDropdownChange = (e) => {
      setDropdownValue(e.target.value);
  };
  const [userName, setUserName] = useState("");
  const [userAddress, setuserAddress] = useState("");
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  // Form submission handler
// Form submission handler
const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if passwords match
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    // Create a new user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get user details from the userCredential
    const user = userCredential.user;

    // Add the user's details to Firestore
    await addDoc(collection(db, "accounts"), {
      userId: user.uid, // Add user's UID as userId field
      roles: dropdownValue,
      name: name,
      surName: surName,
      userName: userName,
      userAddress: userAddress,
      email: email,
      cellPhone: cellPhone,
    });

    // Redirect to a different page after successful signup
    navigate("/admin");
  } catch (error) {
    // Handle any errors that may occur during signup
    console.log(error);
    setError("An error occurred during signup");
  }
};


  return (
    <section>
      <h1>SignUpForm</h1>

      <Form className="form" onSubmit={handleSubmit}>
        {/* Input fields for form data */}

        <select
          className="input-field"
          value={dropdownValue}
          onChange={handleDropdownChange}
          required
        >
          <option value="">Select an option</option>
          <option value="Admin">Admin</option>
          <option value="Resident">Resident</option>
          <option value="Staff">Staff</option>
        </select>
        
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
          placeholder="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          className="input-field"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          className="input-field"
          placeholder="Cellphone Number"
          value={cellPhone}
          onChange={(e) => setCellPhone(e.target.value)}
          required
        />
        <textarea onChange={(e)=>setuserAddress(e.target.value)}/>
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
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Submit button */}
        <button type="submit">Sign Up</button>
      </Form>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </section>
  );
}

export default SignUpForm;
