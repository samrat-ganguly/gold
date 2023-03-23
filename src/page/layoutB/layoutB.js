import "../../style/styleB/style.css";
import Header from "../../components/header/header";
import { useState, useRef, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
import dayjs from "dayjs";

const LayoutB = () => {
  const { user } = useContext(AuthContext);
  const customAxios = useAxios();

  //basic info related
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(null);
  const [doa, setDoa] = useState(null);
  const [doo, setDoo] = useState(dayjs().format("YYYY-MM-DD"));
  const [billno, setBillno] = useState("");
  //Item related

  const [rows, setRows] = useState([
    { owner: user.user_id, desc: "", type: "", ntwt: "", grosswt: "", amt: "" },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        owner: user.user_id,
        desc: "",
        type: "",
        ntwt: "",
        grosswt: "",
        amt: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const inputRefs = useRef([]);

  const handleSelectChange = (event, index) => {
    const { value } = event.target;
    const newRows = [...rows];
    newRows[index].type = value;
    setRows(newRows);
    inputRefs.current[index].focus();
  };

  const handleNtwtChange = (event, index) => {
    const { value } = event.target;
    const newRows = [...rows];
    newRows[index].ntwt = value;
    if (newRows[index].type === "Gold") {
      newRows[index].amt = value * 0;
    } else if (newRows[index].type === "Silver") {
      newRows[index].amt = value * 0;
    } else {
      alert("!Please select type before changing net quantity!");
      newRows[index].ntwt = "";
    }

    setRows(newRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let temp_row = [];

    for (let i = 0; i < rows.length; i++) {
      temp_row.push({
        bill: null,
        owner: user.user_id,
        item_name: rows[i].desc,
        item_type: rows[i].type,
        net_wt: rows[i].ntwt,
        gross_wt: rows[i].grosswt,
        price: rows[i].amt,
      });
    }

    const res = await customAxios
      .post("/bill/post", {
        items: temp_row,
        bill_no: billno,
        doo: doo,
        invoice_date: null,
        purity: null,
        name: name,
        phone_no: phone,
        address: address,
        dob: dob,
        doa: doa,
        other_name: null,
        other_price: 0,
        gold_value: 0,
        gold_rate: 0,
        silver_value: 0,
        silver_rate: 0,
        processing_charges: 0,
        gst: 0,
        hallmark: 0,
        net_amount: 0,
        old_gold_wt: oldgold,
        old_silver_wt: oldsilver,
        advance: advanced,
        refund: 0,
        sold: false,
        owner: user.user_id,
      })
      .catch((err) => {
        alert("!Something Went Wrong!");
      });

    if (res.status === 201) {
      window.location.reload(false);
    }
  };

  //Calculation Related

  const [oldgold, setOldgold] = useState(0);
  const [oldsilver, setOldsilver] = useState(0);
  const [advanced, setAdvanced] = useState(0);

  return (
    <div className="order">
      <Header text={"Order Page"} />
      <hr></hr>

      <section>
        <div className="top">
          <div className="name">
            <div className="row">
              <label>Name : </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="row">
              <label>Address : </label>
              <textarea
                id="Address"
                name="Address"
                rows="4"
                cols="35"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="row">
              <label>Phone No: </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="row">
              <label>DOB : </label>
              <input
                type="date"
                max={dayjs().format("YYYY-MM-DD")}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="row">
              <label>DOA:</label>
              <input
                type="date"
                max={dayjs().format("YYYY-MM-DD")}
                value={doa}
                onChange={(e) => setDoa(e.target.value)}
              />
            </div>
          </div>

          <div className="order">
            <label>Order No. : </label>
            <input
              type="text"
              value={billno}
              onChange={(e) => setBillno(e.target.value)}
            />

            <label>Order Date : </label>
            <input
              type="date"
              value={doo}
              onChange={(e) => setDoo(e.target.value)}
            />
          </div>
        </div>
      </section>

      <hr></hr>

      <section>
        <div className="middle">
          {rows.map((row, index) => (
            <div key={index}>
              <div className="desc">
                <input
                  className="i1"
                  type="text"
                  name="desc"
                  value={row.desc}
                  placeholder="Description"
                  onChange={(event) => handleInputChange(event, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
                <select
                  name="type"
                  value={row.type}
                  onChange={(event) => handleSelectChange(event, index)}
                >
                  <option value=""></option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                </select>

                <div className="roll2">
                  <input
                    type="number"
                    step="0.01"
                    name="ntwt"
                    placeholder="Net Weight"
                    value={row.ntwt}
                    onChange={(event) => handleNtwtChange(event, index)}
                  />
                </div>
                <div className="roll3">
                  <input
                    type="number"
                    step="0.01"
                    name="grosswt"
                    placeholder="Gross Weight"
                    value={row.grosswt}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </div>
                <div className="amount">
                  <input
                    type="number"
                    step="0.01"
                    name="amt"
                    placeholder="Amount"
                    value={row.amt}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </div>
                {index >= 0 && (
                  <button type="button" onClick={() => handleRemoveRow(index)}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="add_row">
          <button type="button" onClick={handleAddRow}>
            Add Row
          </button>
        </div>

        {/* <div className="charges">
          <input
            placeholder="OTHER CHARGES"
            value={otherchargename}
            onChange={(e) => setOtherchargename(e.target.value)}
          />
          <input
            value={otherchargeprice}
            onChange={(e) => setOtherchargeprice(e.target.value)}
          />
        </div> */}
      </section>

      <hr />

      <section>
        <div className="bottom">
          <div className="payment">
            <div className="old_gold_wt">
              <p>OLD GOLD WT. :</p>
              <input
                type="number"
                step="0.01"
                value={oldgold}
                onChange={(e) => setOldgold(e.target.value)}
              />
            </div>

            <div className="old_silver_wt">
              <p>OLD SILVER WT. :</p>
              <input
                type="number"
                step="0.01"
                value={oldsilver}
                onChange={(e) => setOldsilver(e.target.value)}
              />
            </div>

            <div className="advance">
              <p>ADVANCE :</p>
              <input
                type="number"
                step="0.01"
                value={advanced}
                onChange={(e) => setAdvanced(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="submit-btn">
        <button onClick={(e) => handleSubmit(e)}>SUBMIT</button>
      </div>

      <hr></hr>
    </div>
  );
};

export default LayoutB;
