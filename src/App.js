import Login from "./page/login/login";
import Option from "./page/option/option";
import LayoutA from "./page/layoutA/layoutA";
import LayoutB from "./page/layoutB/layoutB";
import LayoutC from "./page/layoutC/layoutC";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import LayoutCopy from "./page/layoutCopy/layoutCopy";

const App = () => {
  return (
    // <AuthProvider>
    //   <Routes>
    //     <Route path="/" exact element={<LayoutA />} />
    //     <Route path="/b" element={<LayoutB />} />
    //     <Route path="/c" element={<LayoutC />} />
    //     <Route path="/l" element={<Login />} />
    //     <Route path="/o" element={<Option />} />
    //     <Route path="/copy" element={<LayoutCopy />} />
    //   </Routes>
    // </AuthProvider>
    <AuthProvider>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" exact element={<Option />} />
          <Route path="/invoice" element={<LayoutA />} />
          <Route path="/order/:id" element={<LayoutCopy />} />
          <Route path="/order" element={<LayoutB />} />
          <Route path="/rates" element={<LayoutC />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
