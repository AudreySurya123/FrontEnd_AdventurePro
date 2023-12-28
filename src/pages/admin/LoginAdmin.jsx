import React, { useState } from "react";
import * as Components from "../Components";
import axios from "axios";
import Swal from "sweetalert2";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import logo from "../../assets/all-images/logoHero.png";

function LoginAdmin() {
  const [signIn, toggle] = React.useState(true);

  const [loggingIn, setLoggingIn] = useState(false); // State untuk menangani status

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoggingIn(true);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:8080/admin/login",
        {
          email: email,
          password: password,
        },
        {
          headers: headers,
        }
      );

      if (response.data.status === "success") {
        localStorage.setItem("admin", JSON.stringify(response.data.values[0]));

        Swal.fire({
          icon: "success",
          title: "Login Success!",
          text: "Welcome back!",
        });

        // Redirect ke halaman admin setelah login
        window.location.href = "/admin";
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: response.data.messages,
        });

        setLoggingIn(false);
        localStorage.setItem("admin", JSON.stringify(null));
      }
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "An error occurred while logging in",
      });

      setLoggingIn(false);
      localStorage.setItem("admin", JSON.stringify(null));
    }
  };

  return (
    <Components.Container>
      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLogin}>
          <Components.Title>Admin Login</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ position: "relative" }}>
            <Components.Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "2.5em" }}
            />
            <span
              onClick={handleTogglePasswordVisibility}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {passwordVisible ? <RiEyeCloseFill /> : <RiEyeFill />}
            </span>
          </div>
          <Components.Button type="submit">Login</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Admin</Components.Title>
            <Components.Paragraph>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "70%",
                }}
              />
            </Components.Paragraph>
            <Components.Paragraph style={{ color: "white", fontSize: "18px" }}>
              Back to{" "}
              <a href="/" style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
                Main Menu
              </a>
            </Components.Paragraph>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default LoginAdmin;
