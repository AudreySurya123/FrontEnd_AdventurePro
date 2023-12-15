import React, { useState } from "react";
import * as Components from "./Components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [signIn, toggle] = React.useState(true);

  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nama === "" || email === "" || password === "") {
      alert("Data Gagal ditambahkan, field tidak boleh ada yang kosong");
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

        // Gunakan fungsi navigate dari useNavigate untuk navigasi
        navigate("/user");

        alert("Data berhasil ditambahkan");
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menambahkan data");
      }
    }
  };
  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSubmit}>
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
          <Components.Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Button type='submit'>Register</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button>Login</Components.Button>
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