import Login from "./page/login/login";
import LayoutA from "./page/layoutA/layoutA";
import LayoutB from "./page/layoutB/layoutB";
import LayoutC from "./page/layoutC/layoutC";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<LayoutA />} />
        <Route path="/b" element={<LayoutB />} />
        <Route path="/c" element={<LayoutC />} />
        <Route path="/l" exact element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
