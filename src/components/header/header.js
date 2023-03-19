import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../../style/header/header.css";

const Header = ({ text }) => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <header>
      <div className="brand">
        <h1>{user ? user.name : "JEWELRY SHOP BILLING SYSTEM"}</h1>
        {user && <button onClick={() => logoutUser()}>Logout</button>}
      </div>
      {text && (
        <div className="brand">
          <h3>{text ? text : ""}</h3>
        </div>
      )}
    </header>
  );
};

export default Header;
