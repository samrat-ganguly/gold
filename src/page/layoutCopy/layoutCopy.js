import "../../style/styleCopy/style.css";
import Header from "../../components/header/header";
import dayjs from "dayjs";
import { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
import { useParams, useNavigate } from "react-router-dom";
// import { env } from "../../utils/env";

const LayoutCopy = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const customAxios = useAxios();
  const [goldrate, setGoldrate] = useState(0);
  const [silverrate, setSilverrate] = useState(0);
  const [making, setMaking] = useState(0);
  const [billid, setBillid] = useState("");
  const [itemid, setItemid] = useState([]);

  //basic info

  useEffect(() => {
    const getValues = async () => {
      const res = await customAxios.get("/constants");
      setGoldrate(res.data[0].gold_rate);
      setSilverrate(res.data[0].silver_rate);
      setMaking(res.data[0].making_charges);
    };
    getValues();

    const getBill = async () => {
      const res = await customAxios.get(`/bill/${id}`).catch((err) => {
        navigate("/");
        return;
      });
      if (res) {
        console.log(res.data);
        setRows(res.data.Items);
        setName(res.data.Bill[0].name);
        setPhone(res.data.Bill[0].phone_no);
        setAddress(res.data.Bill[0].address);
        setDob(res.data.Bill[0].dob);
        setDoa(res.data.Bill[0].doa);
        setDoo(res.data.Bill[0].doo);
        setOrderno(res.data.Bill[0].bill_no);
        setOldgoldwt(res.data.Bill[0].old_gold_wt);
        setOldsilverwt(res.data.Bill[0].old_silver_wt);
        setAdvanced(res.data.Bill[0].advance);
        setBillid(res.data.Bill[0].id);
        let tempid = [];
        for (let i = 0; i < res.data.Items.length; i++) {
          tempid.push(res.data.Items[i].id);
        }
        setItemid(tempid);
      }
    };

    getBill();
    // console.log(env.REACT_APP_BASE_URL);
    // eslint-disable-next-line
  }, []);

  //basic info related
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [doa, setDoa] = useState("");
  const [purity, setPurity] = useState("");
  const [doo, setDoo] = useState("");
  const [invoice, setInvoice] = useState(dayjs().format("YYYY-MM-DD"));
  const [orderno, setOrderno] = useState("");

  //Item related

  const [rows, setRows] = useState([
    {
      owner: user.user_id,
      item_name: "",
      item_type: "",
      net_wt: "",
      gross_wt: "",
      price: "",
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        bill: null,
        owner: user.user_id,
        item_name: "",
        item_type: "",
        net_wt: "",
        gross_wt: "",
        price: "",
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
    newRows[index].item_type = value;
    setRows(newRows);
    inputRefs.current[index].focus();
  };

  const handleNtwtChange = (event, index) => {
    const { value } = event.target;
    const newRows = [...rows];
    newRows[index].net_wt = value;
    if (newRows[index].item_type === "Gold") {
      newRows[index].price = (value * goldrate).toFixed(2);
    } else if (newRows[index].item_type === "Silver") {
      newRows[index].price = (value * silverrate).toFixed(2);
    } else {
      alert("!Please select type before changing net quantity!");
      newRows[index].net_wt = "";
    }

    setRows(newRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let temp_row = [];

    for (let i = 0; i < rows.length; i++) {
      temp_row.push({
        id: itemid[i],
        bill: billid,
        owner: user.user_id,
        item_name: rows[i].item_name,
        item_type: rows[i].item_type,
        net_wt: rows[i].net_wt,
        gross_wt: rows[i].gross_wt,
        price: rows[i].price,
      });
    }

    const res = await customAxios
      .put("/bill/update", {
        id: billid,
        items: temp_row,
        bill_no: orderno,
        invoice_date: invoice,
        doo: doo,
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
        old_gold_wt: oldgoldwt,
        old_silver_wt: oldsilverwt,
        advance: advanced,
        refund: refund,
        sold: true,
        owner: user.user_id,
      })
      .catch((err) => {
        alert("!Something Went Wrong!");
        console.log(err);
        return;
      });

    if (res.status === 200) {
      window.location.reload(false);
    }
  };

  //Calculation Related

  const [totalgold, setTotalgold] = useState(0);
  const [oldgoldwt, setOldgoldwt] = useState(0);
  const [totalsilver, setTotalsilver] = useState(0);
  const [oldsilverwt, setOldsilverwt] = useState(0);
  const [goldvalue, setGoldvalue] = useState(0);
  const [silvervalue, setSilvervalue] = useState(0);
  const [processing, setProcessing] = useState(0);
  const [hallmark, setHallmark] = useState(0);
  const [otherchargename, setOtherchargename] = useState("");
  const [otherchargeprice, setOtherchargeprice] = useState(0);
  const [gst, setGst] = useState(0);
  const [amount, setAmount] = useState(0);
  const [advanced, setAdvanced] = useState(0);
  const [refund, setRefund] = useState(0);

  const handleCalculate = (e) => {
    e.preventDefault();
    let tempgold = 0;
    let tempsilver = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].item_type === "Gold") {
        tempgold = parseFloat(tempgold) + parseFloat(rows[i].net_wt);
      } else {
        tempsilver = parseFloat(tempsilver) + parseFloat(rows[i].net_wt);
      }
    }
    let tempgoldvalue = (tempgold * goldrate).toFixed(2);
    let tempsilvervalue = (tempsilver * silverrate).toFixed(2);
    let temppro = ((tempgold + tempsilver) * making).toFixed(2);
    let tempoldgold = (oldgoldwt * goldrate).toFixed(2);
    let tempoldsilver = (oldsilverwt * silverrate).toFixed(2);
    let tempgst = (
      0.015 *
      (parseFloat(tempgoldvalue) +
        parseFloat(tempsilvervalue) +
        parseFloat(temppro) +
        parseFloat(otherchargeprice))
    ).toFixed(2);
    let tempamt = (
      parseFloat(tempgoldvalue) +
      parseFloat(tempsilvervalue) +
      parseFloat(temppro) +
      2 * parseFloat(tempgst) +
      parseFloat(hallmark) +
      parseFloat(otherchargeprice) -
      parseFloat(tempoldgold) -
      parseFloat(tempoldsilver) -
      advanced
    ).toFixed(2);
    setTotalgold(tempgold);
    setTotalsilver(tempsilver);
    setGoldvalue(tempgoldvalue);
    setSilvervalue(tempsilvervalue);
    setProcessing(temppro);
    setGst(tempgst);
    if (tempamt < 0) {
      setRefund(-tempamt);
      setAmount(0);
    } else {
      setAmount(tempamt);
      setRefund(0);
    }
  };

  return (
    <div className="direct_sale_copy">
      <Header text={"Invoice Page"} />
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
            <label>Invoice Date : </label>
            <input
              type="date"
              placeholder="Order Date"
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
            />

            <label>Order No : </label>
            <input type="text" disabled={true} value={orderno} />

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
                  name="item_name"
                  value={row.item_name}
                  placeholder="Description"
                  onChange={(event) => handleInputChange(event, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
                <select
                  name="item_type"
                  value={row.item_type}
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
                    name="net_wt"
                    placeholder="Net Weight"
                    value={row.net_wt}
                    onChange={(event) => handleNtwtChange(event, index)}
                  />
                </div>
                <div className="roll3">
                  <input
                    type="number"
                    step="0.01"
                    name="gross_wt"
                    placeholder="Gross Weight"
                    value={row.gross_wt}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </div>
                <div className="amount">
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="Amount"
                    value={row.price}
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
      {(amount || refund) && (
        <section>
          <div className="bottom">
            <div className="calculate">
              <label>Advance:</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={advanced}
              />
              <label>Total Gold(gm):</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={totalgold}
              />
              <label>Old Gold(gm):</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={oldgoldwt}
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

              <label>Old Gold Value:</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={(oldgoldwt * goldrate).toFixed(2)}
              />

              <label>Total Silver(gm):</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                placeholder="Total Silver"
                value={totalsilver}
              />

              <label>Old Silver(gm):</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                placeholder="Total Silver"
                value={oldsilverwt}
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

              <label>Old Silver Value:</label>
              <input
                type="number"
                step="0.01"
                disabled={true}
                value={(oldsilverwt * silverrate).toFixed(2)}
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

              {amount ? (
                <>
                  <label>Net Amount:</label>
                  <input
                    type="number"
                    step="0.01"
                    disabled={true}
                    value={amount}
                  />
                </>
              ) : (
                <>
                  <label>Refund:</label>
                  <input
                    type="number"
                    step="0.01"
                    disabled={true}
                    value={refund}
                  />
                </>
              )}
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

export default LayoutCopy;
