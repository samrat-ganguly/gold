import "../../style/login/login.css";

import Header from "../../components/header/header";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    loginUser(username, password);
  };
  return (
    <div className="Login">
      <Header />
      <hr></hr>

      <div className="container">
        <div className="login-container">
          <h1>LOGIN</h1>

          <div className="username">
            <label>USERNAME: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="password">
            <label>PASSWORD: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="submit-btn">
            <button onClick={(e) => handleLogin(e)}>SUBMIT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
