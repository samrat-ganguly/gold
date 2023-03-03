import "../../style/styleA/style.css";
import Header from "../../components/header/header";
import dayjs from "dayjs";
import { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
// import { env } from "../../utils/env";

const LayoutA = () => {
  // const { user } = useContext(AuthContext);
  const customAxios = useAxios();
  const [goldrate, setGoldrate] = useState(0);
  const [silverrate, setSilverrate] = useState(0);
  const [making, setMaking] = useState(0);
  const user = {
    user_id: 1,
  };
  useEffect(() => {
    const getValues = async () => {
      const res = await customAxios.get("/constants");
      setGoldrate(res.data[0].gold_rate);
      setSilverrate(res.data[0].silver_rate);
      setMaking(res.data[0].making_charges);
    };
    getValues();
    // console.log(env.REACT_APP_BASE_URL);
    // eslint-disable-next-line
  }, []);

  //basic info related
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(null);
  const [doa, setDoa] = useState(null);
  const [purity, setPurity] = useState(916);

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
      newRows[index].amt = value * goldrate;
    } else if (newRows[index].type === "Silver") {
      newRows[index].amt = value * silverrate;
    } else {
      alert("!Please select type before changing net quantity!");
      newRows[index].ntwt = 0;
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
        bill_no: "",
        doo: dayjs().format("YYYY-MM-DD"),
        purity: purity,
        name: name,
        phone_no: phone,
        address: address,
        dob: dob,
        doa: doa,
        other_name: otherchargename,
        other_price: otherchargeprice,
        gold_value: goldvalue,
        gold_rate: goldrate,
        silver_value: silvervalue,
        silver_rate: silverrate,
        processing_charges: processing,
        gst: gst,
        hallmark: hallmark,
        net_amount: amount,
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

  const [totalgold, setTotalgold] = useState(0);
  const [totalsilver, setTotalsilver] = useState(0);
  const [goldvalue, setGoldvalue] = useState(0);
  const [silvervalue, setSilvervalue] = useState(0);
  const [processing, setProcessing] = useState(0);
  const [hallmark, setHallmark] = useState(0);
  const [otherchargename, setOtherchargename] = useState("");
  const [otherchargeprice, setOtherchargeprice] = useState(0);
  const [gst, setGst] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleCalculate = (e) => {
    e.preventDefault();
    let tempgold = 0;
    let tempsilver = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].type === "Gold") {
        tempgold = parseFloat(tempgold) + parseFloat(rows[i].ntwt);
      } else {
        tempsilver = parseFloat(tempsilver) + parseFloat(rows[i].ntwt);
      }
    }
    let tempgoldvalue = (tempgold * goldrate).toFixed(2);
    let tempsilvervalue = (tempsilver * silverrate).toFixed(2);
    let temppro = ((tempgold + tempsilver) * making).toFixed(2);
    let tempgst = (
      0.015 *
      (parseFloat(tempgoldvalue) +
        parseFloat(tempsilvervalue) +
        parseFloat(temppro) +
        parseFloat(otherchargeprice))
    ).toFixed(2);
    setTotalgold(tempgold);
    setTotalsilver(tempsilver);
    setGoldvalue(tempgoldvalue);
    setSilvervalue(tempsilvervalue);
    setProcessing(temppro);
    setGst(tempgst);
    setAmount(
      parseFloat(tempgoldvalue) +
        parseFloat(tempsilvervalue) +
        parseFloat(temppro) +
        2 * parseFloat(tempgst) +
        parseFloat(hallmark) +
        parseFloat(otherchargeprice)
    );
  };

  return (
    <div className="direct_sale">
      <Header />
      <hr></hr>

      <section>
        <div className="top">
          <div className="name">
            <div className="row">
              <label>Name : </label>
              <input
                type="text"
                placeholder="Name"
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
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="row">
              <label>Phone : </label>
              <input
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="row">
              <label>DOB : </label>
              <input
                type="date"
                placeholder="DOB"
                max={dayjs().format("YYYY-MM-DD")}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="row">
              <label>DOA:</label>
              <input
                type="date"
                placeholder="DOA"
                max={dayjs().format("YYYY-MM-DD")}
                value={doa}
                onChange={(e) => setDoa(e.target.value)}
              />
            </div>
          </div>

          <div className="order">
            <label>Order Date : </label>
            <input
              type="date"
              placeholder="Order Date"
              disabled={true}
              defaultValue={dayjs().format("YYYY-MM-DD")}
            />

            <label>Purity : </label>
            <input
              type="text"
              placeholder="Purity"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
            />
          </div>
        </div>
      </section>

      <hr />

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

        <div className="charges">
          <input
            placeholder="OTHER CHARGES"
            value={otherchargename}
            onChange={(e) => setOtherchargename(e.target.value)}
          />
          <input
            value={otherchargeprice}
            onChange={(e) => setOtherchargeprice(e.target.value)}
          />
        </div>
        <div className="charges">
          <label>HallMark Charge : </label>
          <input
            value={hallmark}
            onChange={(e) => setHallmark(e.target.value)}
          />
        </div>
        <div className="charges">
          <label>Processing Charge : </label>
          <input value={making} onChange={(e) => setMaking(e.target.value)} />
        </div>
        <div className="middle-btn">
          <button onClick={(e) => handleCalculate(e)}>CALCULATE</button>
        </div>
      </section>

      <hr />
      {amount && (
        <section>
          <div className="bottom">
            <div className="calculate">
              <label>Total Gold(gm):</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={totalgold}
              />

              <label>Gold Rate:</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={goldrate}
              />

              <label>Gold Value:</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={goldvalue}
              />

              <label>Total Silver(gm):</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                placeholder="Total Silver"
                value={totalsilver}
              />

              <label>Silver Rate:</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={silverrate}
              />

              <label>Silver Value:</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={silvervalue}
              />

              <label>Processing Charges:</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={processing}
              />

              <label>
                {otherchargename ? otherchargename : "Other charges"}
              </label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={otherchargeprice}
              />

              <label>SGST 1.5%:</label>
              <input type="number" step="0.01" disabled={true} value={gst} />

              <label>CGST 1.5%:</label>
              <input type="number" step="0.01" disabled={true} value={gst} />

              <label>Hall Mark Charges:</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={hallmark}
              />

              <label>Net Amount:</label>
              <input type="number" step="0.01" disabled={true} value={amount} />
            </div>
          </div>
        </section>
      )}

      {amount && name && (
        <div className="submit-btn">
          <button onClick={(e) => handleSubmit(e)}>SUBMIT</button>
        </div>
      )}
    </div>
  );
};

export default LayoutA;
