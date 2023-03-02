import Login from "./page/login/login";
import LayoutA from "./page/layoutA/layoutA";
import LayoutB from "./page/layoutB/layoutB";
import LayoutC from "./page/layoutC/layoutC";
import TestPage from "./page/TestPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" exact element={<LayoutA />} />
        <Route path="/b" element={<LayoutB />} />
        <Route path="/c" element={<LayoutC />} />
        <Route path="/l" element={<Login />} />
      </Routes>
    </AuthProvider>
    // <AuthProvider>
    //   <Routes>
    //     <Route element={<PrivateRoutes />}>
    //       <Route path="/" exact element={<LayoutA />} />
    //       <Route path="/b" element={<LayoutB />} />
    //       <Route path="/c" element={<LayoutC />} />
    //       <Route path="/d" element={<TestPage />} />
    //     </Route>
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    // </AuthProvider>
  );
};

export default App;
