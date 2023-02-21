import "../../style/styleA/style.css";
import Header from "../../components/header/header";
const LayoutA = () => {
  return (
    <div className="direct_sale">
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
            <label>Order Date : </label>
            <input type="date" placeholder="Order Date" />

            <label>Purity : </label>
            <input type="text" placeholder="Purity" />
          </div>
        </div>
      </section>

      <hr></hr>

      <section>
        <div className="middle">
          <div className="desc">
            <p>DESCRIPTION</p>
            <textarea placeholder="Description"></textarea>
            <select name="cars" id="cars">
              <option value="GOLD">GOLD</option>
              <option value="SILVER">SILVER</option>
            </select>
            <textarea placeholder="Description"></textarea>
            <select name="cars" id="cars">
              <option value="GOLD">GOLD</option>
              <option value="SILVER">SILVER</option>
            </select>
            <textarea placeholder="Description"></textarea>
            <select name="cars" id="cars">
              <option value="GOLD">GOLD</option>
              <option value="SILVER">SILVER</option>
            </select>
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
          <div className="calculate">
            <label>Total Gold:</label>
            <input type="text" placeholder="Total Gold" />

            <label>Old Value:</label>
            <input type="text" placeholder="Old Gold" />

            <label>Gold Rate:</label>
            <input type="text" placeholder="Gold Rate" />

            <label>Gold Value:</label>
            <input type="text" placeholder="Gold Value" />

            <label>Processing Charges:</label>
            <input type="text" placeholder="Processing Charges" />

            <label>Other Charges:</label>
            <input type="text" placeholder="Other Charges" />

            <label>SGST 1.5%:</label>
            <input type="text" placeholder="SGST" />

            <label>CGST 1.5%:</label>
            <input type="text" placeholder="CGST" />

            <label>Hall Mark Charges:</label>
            <input type="text" placeholder="Hall Mark Charges" />

            <label>Total Amount:</label>
            <input type="text" placeholder="Total Amount" />

            <label>Less Advance:</label>
            <input type="text" placeholder="Less Advance" />

            <label>Net Amount:</label>
            <input type="text" placeholder="Net Amount" />
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

export default LayoutA;
