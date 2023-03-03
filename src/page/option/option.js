import "../../style/option/main.css";

const Option = () => {
  return (
    <div className="option-page">
      <div className="container">
        <div className="buttons">
          <button>Direct Sale</button>
          <button>Order</button>
          <button>change rate</button>
        </div>
        <input type="text" placeholder="Enter" />
        <div className="table">
          <table>
            <tr>
              <th>Order No.</th>
              <th>Customer Name</th>
            </tr>
            <tr>
              <td>65656585</td>
              <td>Abraham Lincoln</td>
            </tr>
            <tr>
              <td>54144554</td>
              <td>Donald Trump</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Option;
