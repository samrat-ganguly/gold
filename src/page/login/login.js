import "../../style/login/login.css";

import Header from "../../components/header/header";

const Login = () => {
  return (
    <div className="Login">
      <Header />
      <hr></hr>

      <div className="container">
        <div className="login-container">
          <h1>LOGIN</h1>

          <div className="username">
            <label>USERNAME : </label>
            <input type="text"></input>
          </div>

          <div className="password">
            <label>PASSWORD : </label>
            <input type="password"></input>
          </div>

          <div className="submit-btn">
            <button>SUBMIT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
