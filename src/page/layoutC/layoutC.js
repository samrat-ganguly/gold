import "../../style/styleC/style.css";
import Header from "../../components/header/header";
import img2 from "../../images/pen-to-square-solid.svg";
import img1 from "../../images/check-solid.svg";

const LayoutC = () => {
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
                <input type="text" placeholder="GOLD RATE (/gm)" />
                <button>
                  <img src={img1} alt="!"></img>
                </button>
                <button>
                  <img src={img2} alt="!"></img>
                </button>
              </div>
            </div>

            <div className="rate">
              <label>SILVER RATE (/gm)</label>
              <input type="text" placeholder="SILVER RATE (/gm)" />
            </div>

            <div className="rate">
              <label>MAKING CHARGES (/gm)</label>
              <input type="text" placeholder="MAKING CHARGES (/gm)" />
            </div>

            <div className="submit-btn">
              <button>SUBMIT</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LayoutC;
