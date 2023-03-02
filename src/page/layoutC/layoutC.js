import "../../style/styleC/style.css";
import Header from "../../components/header/header";
import img2 from "../../images/pen-to-square-solid.svg";
import img1 from "../../images/check-solid.svg";
import { useState, useEffect, useContext } from "react";
import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";

const LayoutC = () => {
  const [goldrate, setGoldrate] = useState(0);
  const [goldedit, setGoldedit] = useState(false);
  const [goldpic, setGoldpic] = useState(<img src={img2} alt="!" />);
  const [silverrate, setSilverrate] = useState(0);
  const [silveredit, setSilveredit] = useState(false);
  const [silverpic, setSilverpic] = useState(<img src={img2} alt="!" />);
  const [making, setMaking] = useState(0);
  const [makingedit, setMakingedit] = useState(false);
  const [makingpic, setMakingpic] = useState(<img src={img2} alt="!" />);
  const customAxios = useAxios();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getValues = async () => {
      const res = await customAxios.get("/constants");
      setGoldrate(res.data[0].gold_rate);
      setSilverrate(res.data[0].silver_rate);
      setMaking(res.data[0].making_charges);
    };
    getValues();
    // eslint-disable-next-line
  }, []);

  const handleGoldEdit = () => {
    if (goldedit) {
      setGoldedit(false);
      setGoldpic(<img src={img2} alt="!" />);
    } else {
      setGoldedit(true);
      setGoldpic(<img src={img1} alt="!" />);
    }
  };

  const handleSilverEdit = () => {
    if (silveredit) {
      setSilveredit(false);
      setSilverpic(<img src={img2} alt="!" />);
    } else {
      setSilveredit(true);
      setSilverpic(<img src={img1} alt="!" />);
    }
  };

  const handleMakingEdit = () => {
    if (makingedit) {
      setMakingedit(false);
      setMakingpic(<img src={img2} alt="!" />);
    } else {
      setMakingedit(true);
      setMakingpic(<img src={img1} alt="!" />);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.user_id);
    const res = await customAxios
      .post("/constants/update", {
        gold_rate: goldrate,
        silver_rate: silverrate,
        making_charges: making,
        owner: user.user_id,
      })
      .catch((err) => {
        alert("!Something went wrong!");
        return;
      });

    if (res.status === 200 || res.status === 201) {
      setGoldrate(res.data.gold_rate);
      setSilverrate(res.data.silver_rate);
      setMaking(res.data.making_charges);
      setGoldedit(false);
      setSilveredit(false);
      setMakingedit(false);
      setGoldpic(<img src={img2} alt="!" />);
      setSilverpic(<img src={img2} alt="!" />);
      setMakingpic(<img src={img2} alt="!" />);
    }
  };

  return (
    <div className="change_rate">
      <Header />

      <hr></hr>

      <section>
        <div className="center">
          <div className="cover">
            <div className="rate">
              <label>GOLD RATE (/gm)</label>
              <div className="place">
                <input
                  type="text"
                  disabled={!goldedit}
                  value={goldrate}
                  onChange={(e) => setGoldrate(e.target.value)}
                  onClick={() => setGoldrate("")}
                />
                <button onClick={() => handleGoldEdit()}>{goldpic}</button>
              </div>
            </div>

            <div className="rate">
              <label>SILVER RATE (/gm)</label>
              <div className="place">
                <input
                  type="text"
                  disabled={!silveredit}
                  value={silverrate}
                  onChange={(e) => setSilverrate(e.target.value)}
                  onClick={() => setSilverrate("")}
                />
                <button onClick={() => handleSilverEdit()}>{silverpic}</button>
              </div>
            </div>

            <div className="rate">
              <label>MAKING CHARGES (/gm)</label>
              <div className="place">
                <input
                  type="text"
                  value={making}
                  disabled={!makingedit}
                  onChange={(e) => setMaking(e.target.value)}
                  onClick={() => setMaking("")}
                />
                <button onClick={() => handleMakingEdit()}>{makingpic}</button>
              </div>
            </div>

            <div className="submit-btn">
              <button onClick={(e) => handleSubmit(e)}>SUBMIT</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LayoutC;
