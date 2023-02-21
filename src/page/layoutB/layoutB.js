import "../../style/styleB/style.css";
import Header from "../../components/header/header";
const LayoutB = () => {
  return (
    <div className="order">
      <Header />
      <hr></hr>

      <section>
        <div className="top">
          <div className="name">
            <div className="row">
              <label>Name : </label>
              <input type="text" placeholder="Name" />
            </div>

            <div className="row">
              <label>Address : </label>
              <textarea
                id="Address"
                name="Address"
                rows="4"
                cols="35"
                placeholder="Address"
              ></textarea>
            </div>

            <div className="row">
              <label>Phone : </label>
              <input type="number" placeholder="Phone" />
            </div>

            <div className="row">
              <label>DOB : </label>
              <input type="date" placeholder="DOB" />
            </div>

            <div className="row">
              <label>DOA:</label>
              <input type="date" placeholder="DOB" />
            </div>
          </div>

          <div className="order">
            <label>Order No. : </label>
            <input type="text" placeholder="Purity" />

            <label>Order Date : </label>
            <input type="date" placeholder="Order Date" />
          </div>
        </div>
      </section>

      <hr></hr>

      <section>
        <div className="middle">
          <div className="desc">
            <p>DESCRIPTION</p>
            <textarea placeholder="Description"></textarea>
            <textarea placeholder="Description"></textarea>
            <textarea placeholder="Description"></textarea>
          </div>

          <div className="together">
            <div className="roll2">
              <p>NET WT.</p>
              <input placeholder="NET WT."></input>
              <input placeholder="NET WT."></input>
              <input placeholder="NET WT."></input>
            </div>

            <div className="roll3">
              <p>GROSS WT.</p>
              <input placeholder="GROSS WT."></input>
              <input placeholder="GROSS WT."></input>
              <input placeholder="GROSS WT."></input>
            </div>

            <div className="amount">
              <p>Amount</p>
              <input placeholder="Amount"></input>
              <input placeholder="Amount"></input>
              <input placeholder="Amount"></input>
            </div>
          </div>
        </div>

        <div className="charges">
          <label>OTHER CHARGES :</label>
          <input placeholder="OTHER CHARGES"></input>
        </div>

        <div className="middle-btn">
          <button>CALCULATE</button>
        </div>
      </section>

      <hr></hr>

      <section>
        <div className="bottom">
          <div className="payment">
            <div className="old_gold_wt">
              <p>OLD GOLD WT. :</p>
              <input placeholder="NIL"></input>
            </div>

            <div className="advance">
              <p>ADVANCE :</p>
              <input placeholder="NIL"></input>
            </div>

            <div className="refund">
              <p>REFUND :</p>
              <input placeholder="NIL"></input>
            </div>
          </div>
        </div>
      </section>

      <div className="submit-btn">
        <button>SUBMIT</button>
      </div>

      <hr></hr>
    </div>
  );
};

export default LayoutB;
