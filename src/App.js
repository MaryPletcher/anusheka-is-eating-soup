import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        {/* homepage */}
        <Route path="/" element={<Home />} />

        {/* individual drop page (dynamic route) */}
        {/* <Route path="/drops/:id" element={<DropPage />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
