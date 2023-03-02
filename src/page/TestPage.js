import React, { useState, useRef } from "react";

function TestPage() {
  const [rows, setRows] = useState([
    { desc: "", type: "", ntwt: "", grosswt: "", amt: "" },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { desc: "", type: "", ntwt: "", grosswt: "", amt: "" }]);
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
    newRows[index].amt = value * 600;
    setRows(newRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(rows);
  };

  return (
    <div>
      {rows.map((row, index) => (
        <div key={index}>
          <input
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
          <input
            type="number"
            step="0.01"
            name="ntwt"
            placeholder="Net Weight"
            value={row.ntwt}
            onChange={(event) => handleNtwtChange(event, index)}
          />
          <input
            type="number"
            step="0.01"
            name="grosswt"
            placeholder="Gross Weight"
            value={row.grosswt}
            onChange={(event) => handleInputChange(event, index)}
          />
          <input
            type="number"
            step="0.01"
            name="amt"
            placeholder="Amount"
            value={row.amt}
            onChange={(event) => handleInputChange(event, index)}
          />
          {index > 0 && (
            <button type="button" onClick={() => handleRemoveRow(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddRow}>
        Add Row
      </button>
      <button type="button" onClick={handleSubmit}>
        submit
      </button>
    </div>
  );
}

export default TestPage;
