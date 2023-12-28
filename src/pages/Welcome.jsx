import React, { useState } from "react";
import * as Components from "./Components";
import axios from "axios";
import Swal from "sweetalert2";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";

function Welcome() {
  const [signIn, toggle] = React.useState(true);

  const [loggingIn, setLoggingIn] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (nama === "" || email === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Data Gagal ditambahkan, field tidak boleh ada yang kosong",
      });
    } else if (!validatePassword(password)) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol",
      });
    } else {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        await axios.post(
          "http://localhost:8080/user/",
          {
            nama: nama,
            email: email,
            password: password,
          },
          {
            headers: headers,
          }
        );

        setNama("");
        setEmail("");
        setPassword("");

        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Registrasi Berhasil, Lakukan Login Sekarang!",
        });
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Terjadi kesalahan saat registrasi",
        });
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoggingIn(true);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:8080/user/login",
        {
          email: email,
          password: password,
        },
        {
          headers: headers,
        }
      );

      if (response.data.status === "success") {
        const userData = response.data.values[0];
        localStorage.setItem("user", JSON.stringify(userData));

        Swal.fire({
          icon: "success",
          title: "Login Sukses!",
          text: "Selamat Datang Kembali!",
        });

        window.location.href = "/home2";
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal!",
          text: response.data.messages,
        });

        setLoggingIn(false);
        localStorage.setItem("user", JSON.stringify(null));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          <Components.Title>Sign Up</Components.Title>
          <Components.Input
            type="text"
            placeholder="Nama User"
            name="nama"
            autoFocus
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <Components.Input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ position: "relative" }}>
            <Components.Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
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
          <Components.Button type="submit">Register</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLogin}>
          <Components.Title>Sign in</Components.Title>
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
          <Components.Anchor href="#">Lupa kata sandi?</Components.Anchor>
          <Components.Button type="submit">Login</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Login
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Climbers</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Register
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Welcome;
