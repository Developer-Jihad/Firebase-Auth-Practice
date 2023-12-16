// Import necessary dependencies
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../../Firebase/firebase.init";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

// Create the Login component
const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // State to hold the form data
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormData(formData);
    console.log(formData.email, formData.password);

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(({ user: { displayName, email, photoURL } }) => {
        setUserInfo({
          userName: displayName,
          userEmail: email,
          userPhoto: photoURL,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    setFormData({
      email: "",
      password: "",
    });
  };
  const googleLogIn = () => {
    signInWithPopup(auth, provider)
      .then(({ user: { displayName, email, photoURL } }) => {
        setUserInfo({
          userName: displayName,
          userEmail: email,
          userPhoto: photoURL,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  // console.log("Login submitted:", user);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <br />
      <hr />
      <br />
      <h3>SignIn with</h3>
      <br />
      <div className="flex">
        <FaFacebook className="icon" />
        <FcGoogle className="icon" onClick={googleLogIn} />
        <FaGithub className="icon" />
      </div>
      <br />

      {userInfo && (
        <div className="userInfo">
          <img src={userInfo.userPhoto} alt="" />

          <div className="info">
            <h3>{userInfo.userName}</h3>
            <p>{userInfo.userEmail}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
