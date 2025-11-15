import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ControlPanelPage from "./pages/ControlPanelPage";


function App() {
  return (
    <Router>
      <Routes>
        {/* homepage */}
        <Route path="/Home" element={<Home />} />

        {/* control panel page */}
        <Route path="/ControlPanelPage" element={<ControlPanelPage />} />

        {/* individual drop page (dynamic route) */}
        {/* <Route path="/drops/:id" element={<DropPage />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
