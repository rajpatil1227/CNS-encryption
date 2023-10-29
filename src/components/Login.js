import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  let prime = new Set();
  let public_key = null;
  let private_key = null;
  let n = null;

  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }

  function setkeys() {
    let prime1 = 997;
    let prime2 = 10007;

    n = prime1 * prime2;
    let fi = (prime1 - 1) * (prime2 - 1);

    let e = 2;
    while (true) {
      if (gcd(e, fi) === 1) {
        break;
      }
      e++;
    }

    public_key = e;

    let d = 2;
    while (true) {
      if ((d * e) % fi === 1) {
        break;
      }
      d++;
    }

    private_key = d;
  }

  function encrypt(message) {
    let e = public_key;
    let encrypted_text = 1;
    while (e > 0) {
      encrypted_text *= message;
      encrypted_text %= n;
      e--;
    }
    return encrypted_text;
  }

  function encoder(message) {
    let encoded = [];
    for (let i = 0; i < message.length; i++) {
      encoded.push(encrypt(message.charCodeAt(i)));
    }
    return encoded;
  }

  setkeys();
  
  let coded = encoder(password);

  console.log("Initial message:");
  console.log(password);
  console.log("\n\nThe encoded message(encrypted by public key)\n");
  
  let plain=coded.join("");
  console.log(plain);

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/", {
          email,
          password: plain,
        })
        .then((res) => {
          if (res.data === "exist") {
            history("/home", { state: { id: email } });
          } else if (res.data === "notexist") {
            alert("User not found. Firstly, sign up.");
          } else if (res.data === "wrongpass") {
            alert("Wrong password..!");
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login" >
      <h1>Login</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <div>
          <input
            className="showPasswordDiv"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <button
            className="showPassword"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>
        <input type="submit" onClick={submit} />
      </form>

      <br />
      <p style={{color:"white"}}>OR</p>
      <br />

      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Login;
