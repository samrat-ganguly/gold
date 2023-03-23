import "../../style/option/main.css";
import Header from "../../components/header/header";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAxios from "../../utils/useAxios";
import editbutton from "../../images/edit.png";

const Option = () => {
  const [search, setSearch] = useState("");
  const [table, setTable] = useState(null);
  const [alert, setAlert] = useState("");

  const customAxios = useAxios();

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    let temptable = [];

    const res = await customAxios
      .get(`/bill/${e.target.value}`)
      .catch((err) => {
        setAlert("Entry not found !!");
        return;
      });
    if (res) {
      setAlert("");
      for (let i = 0; i < res.data.Bill.length; i++) {
        temptable.push(
          <tr key={res.data.Bill[i].id}>
            <td>{res.data.Bill[i].bill_no}</td>
            <td>{res.data.Bill[i].name}</td>
            <td>
              <Link to={"/order/" + res.data.Bill[i].bill_no}>
                <img height="20px" src={editbutton} alt="" />
              </Link>
            </td>
          </tr>
        );
      }
    }
    setTable(temptable);
  };
  return (
    <div className="option-page">
      <Header text={"Dashboard"} />
      <div className="container">
        <div className="buttons">
          <Link to="/invoice" style={{ textDecoration: "none" }}>
            <button>Direct Sale</button>
          </Link>
          <Link to="/order" style={{ textDecoration: "none" }}>
            <button>Order</button>
          </Link>
          <Link to="/rates" style={{ textDecoration: "none" }}>
            <button>change rate</button>
          </Link>
        </div>
        <input
          type="text"
          placeholder="Enter Bill No"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
        {search && !alert && (
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Order No.</th>
                  <th>Customer Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{table}</tbody>
            </table>
          </div>
        )}
        <p>{alert}</p>
      </div>
    </div>
  );
};

export default Option;
